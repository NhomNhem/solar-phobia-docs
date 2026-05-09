---
title: 'Phase 4: Cross-System Scenario Walkthrough'
description: 'Bản dịch tiếng Việt cho Phase 4: Cross-System Scenario Walkthrough.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

## Executive Summary

This phase analyzes 5 critical multi-hệ thống scenarios that occur during Solar Phobia's day/night gameplay loop. Each scenario involves simultaneous hệ thống activation and complex data flow. Analysis reveals **4 Blockers** (critical bugs that break gameplay), **3 Warnings** (compounding risks), and **2 Info** items (minor ordering ambiguities).

---

## Scenarios Identified

1. **Phase ban ngày: Shadow shrink reaches critical size + player idles + auto-complete timeout**
2. **Choice Lock transition: Player confirms lựa chọn → Bộ xử lý hậu quả computes curse**
3. **Phase ban đêm: Boss searchlight sweep + player in open + Bộ đếm ward critical + Bone Relic held**
4. **Bộ đếm ward reaches critical threshold (25% health) while player is mid-sprint**
5. **Player collects Bone Relic during đang hoạt động boss sweep**

---

## Scenario 1: Phase ban ngày Shadow Shrink + Idle + Auto-Hoàn tất Timeout

**Systems Involved**: Game Máy trạng thái, Quản lý không gian bóng, Day Service & Selection, Mô hình dữ liệu NPC/linh hồn

**Trigger**: 
- phase ban ngày duration timer approaches end (~15-30 sec remaining)
- Player has NOT confirmed lựa chọn (still unselected or invalid pattern)
- Auto-commit timeout (15 sec) activates

**Sequence**:
1. Game Máy trạng thái sends OnDayStart → Shadow Spatial begins polygon contraction
2. Day Service displays soul UI, awaits player input
3. Auto-complete timeout fires (15 sec idle)
4. Day Service applies fallback priority: Linh → Van → Minh
5. Day Service sends SelectionConfirmed(payload) with auto-selected 2 Saved, 1 Abandoned
6. NPC Model records auto-selected trạng thái
7. Game Máy trạng thái validates and transitions to Khóa lựa chọn
8. Shadow Spatial freezes polygon

**Data Flow Analysis**: 
- ✅ Day Service → Trạng thái game: payload well-defined
- ✅ Trạng thái game → Shadow Spatial: phase event triggers freeze
- ⚠️ **CRITICAL**: If crowd density > 0.5 souls/m² at timeout, souls auto-push INTO sunlight while auto-complete marks them Saved/Abandoned

**Failure Modes**:

| Issue | Severity | Description |
|-------|----------|-------------|
| **Race condition** | BLOCKER | Shadow auto-push fires while auto-complete fires. Souls burn before formal lựa chọn. NPC Model has contradictory LifeState (Lost but Saved/Abandoned). |
| **State transition** | BLOCKER | Shadow continues shrinking until lựa chọn confirmed, nên freeze IMMEDIATELY on auto-complete timeout. |
| **Undefined behavior** | BLOCKER | If polygon area < 1 m² (auto thermal death), but auto-complete hasn't fired, all souls burn. Which souls appear in night data? |
| **No UI feedback** | WARNING | Auto-complete triggers silently. Player unaware. |

**Issues Found**:
- [BLOCKER] Race condition: shadow crowding + auto-complete can both fire simultaneously
- [BLOCKER] Shadow nên freeze IMMEDIATELY on auto-complete, not after
- [BLOCKER] No spec for which souls survive if thermal death during auto-complete
- [WARNING] No UI feedback when auto-complete triggers
- [INFO] Auto-complete priority order (Linh → Van → Minh) xác định but hidden from player

---

## Scenario 2: Choice Lock Transition - Selection → Bộ xử lý hậu quả

**Systems Involved**: Game Máy trạng thái, Day Service, NPC Model, Bộ xử lý hậu quả, Map Director, Máu/thể lực

**Trigger**: 
- Valid lựa chọn confirmed (2 Saved, 1 Abandoned)
- Player clicks Confirm in Day Service UI

**Sequence**:
1. Day Service validates lựa chọn pattern
2. NPC Model receives lock: RecordLockState = Locked
3. Day Service sends SelectionConfirmed(payload) with abandoned_soul_id
4. Game Máy trạng thái validates payload
5. Game Máy trạng thái transitions to Khóa lựa chọn
6. Bộ xử lý hậu quả invoked
7. Bộ xử lý hậu quả reads abandoned soul ID
8. Bộ xử lý hậu quả maps curse: Linh→Drag, Van→Block, Minh→FakeShrine
9. Bộ xử lý hậu quả writes NightOutcomeState to NPC Model
10. Map Director receives curse payload
11. Máu/thể lực computes initial Bộ đếm ward
12. Trạng thái game validates all payloads ready
13. Trạng thái game transitions to Sinh tồn ban đêm

**Data Flow Analysis**:
- ✅ Day Service → Trạng thái game: payload clear
- ✅ Trạng thái game → Bộ xử lý hậu quả: xác định
- ✅ Bộ xử lý hậu quả → NPC Model: one-time write
- ⚠️ **CRITICAL**: If Map spawn kiểm tra hợp lệ FAILS, Bộ xử lý hậu quả already wrote NightOutcomeState. NPC Model locked. No retry path.

**Failure Modes**:

| Issue | Severity | Description |
|-------|----------|-------------|
| **State order** | BLOCKER | Bộ xử lý hậu quả writes BEFORE Map validates spawn. If spawn fails, NPC locked with duplicate-write error blocking retry. |
| **No rollback** | BLOCKER | No trạng thái rollback if spawn kiểm tra hợp lệ fails. Selection committed but night cannot start. |
| **Data mismatch** | WARNING | If Máu/thể lực uses different "saved count" than payload, initial Ward incorrect. |

**Issues Found**:
- [BLOCKER] Bộ xử lý hậu quả writes before Map validates. If Map fails, no retry path.
- [BLOCKER] NPC Model lock nên release on Lỗi nghiêm trọng for xác định fallback
- [WARNING] No data contract between Day Service saved count and Máu/thể lực calculation
- [INFO] Consequence payload delivery order to Map vs Curse Modules ambiguous

---

## Scenario 3: Phase ban đêm - Sweep + Open + Ward Critical + Bone Relic

**Systems Involved**: Map Director, Bộ điều khiển người chơi, Máu/thể lực, Trạng thái game, Mục tiêu miếu

**Trigger**:
- Player in Sinh tồn ban đêm
- Position: outside cover, in sweep cone
- Bộ đếm ward: ≤ 25% (Tier 4 - Panic)
- Inventory: carrying 1+ Bone Relics

**Sequence**:
1. Map Director patrol sweep executes
2. Map checks is_exposed = in_sweep AND (not in_valid_cover) = TRUE
3. StrikeTelegraph starts (1.2 sec warning)
4. Máu/thể lực applies Tier 4 effects: chromatic aberration, whispering, +0.1s dash cooldown
5. Bộ điều khiển người chơi receives OnStrikeWarning, displays warning icon
6. Player tries sprint to escape → sends is_sprinting=true to Máu/thể lực
7. Máu/thể lực calculates effective drain: 1.0 * (1 + 1*2.0) = 3.0/sec during sprint
8. Player exits cover before telegraph ends
9. StrikeTelegraph completes
10. Map re-checks exposure: still TRUE
11. Strike penalty applied: ward_time = max(0, ward_time - 30)
12. If Ward ≤ 0: Mục tiêu miếu detects OnWardTimerEmpty → lose condition

**Data Flow Analysis**:
- ✅ Map → Bộ điều khiển người chơi: strike warning clear
- ✅ Máu/thể lực → Bộ điều khiển người chơi: Ward critical clear
- ✅ Map → Mục tiêu miếu: strike penalty valid input
- ⚠️ **CRITICAL**: Tier 4 chromatic aberration OBSCURES strike warning icon. Player can't see fair warning during peak panic.
- ⚠️ **CRITICAL**: Compounding drains can delete 60+ seconds in <5 seconds.

**Failure Modes**:

| Issue | Severity | Description |
|-------|----------|-------------|
| **Visual obscuration** | BLOCKER | Strike warning icon lost in Tier 4 chromatic aberration. Violates "fair readability" principle. |
| **Unbounded difficulty** | BLOCKER | Bone Relic (2x) + sprint (-5s) + strike (-30s) + Tier 4 panic = 60+ sec loss possible. |
| **Feedback loop** | WARNING | Low Ward → Tier 4 effects → panic sprint → faster drain → more panic. No governor. |
| **Reward becomes punishment** | WARNING | Bone Relic intended as risk/reward becomes unbounded death sentence. |

**Issues Found**:
- [BLOCKER] Strike warning icon visually obscured by Tier 4 chromatic aberration
- [BLOCKER] Compounding drain mechanics create unfair difficulty spike (60+ sec loss)
- [WARNING] Feedback loop: low Ward → Tier 4 → sprint → drain. Add maximum Tier 4 duration (30 sec)
- [WARNING] Route viability check may NOT guarantee fairness under "hit twice with Bone Relic" scenario

---

## Scenario 4: Bộ đếm ward at 25% (Critical) While Mid-Sprint

**Systems Involved**: Máu/thể lực, Bộ điều khiển người chơi, Trạng thái game, HUD/Diegetic Feedback

**Trigger**:
- Player sprinting (Shift held)
- Bộ đếm ward drops to ≤ 25% threshold

**Sequence**:
1. Máu/thể lực tracks Bộ đếm ward drain (1.0/sec base, 5.0/sec with sprint)
2. Bộ đếm ward drops to 25% of Initial_Ward_Sec
3. Máu/thể lực emits OnWardTimerCritical event (Tier 4)
4. Bộ điều khiển người chơi receives event, applies Tier 4 effects to HUD
5. HUD displays critical color/pulsing
6. Player still sprinting (initiated before threshold)
7. Bộ điều khiển người chơi checks dash cooldown: +0.1s per Tier 4
8. Player releases Shift or Ward = 0

**Data Flow Analysis**:
- ✅ Máu/thể lực → Bộ điều khiển người chơi: event clear
- ✅ Bộ điều khiển người chơi → HUD: feedback update clear
- ⚠️ "Increased dash cooldown +0.1s" ambiguous: during or after sprint?
- ⚠️ Tier 4 → Tier 5 effect stacking rules undefined

**Failure Modes**:

| Issue | Severity | Description |
|-------|----------|-------------|
| **Ambiguous cooldown** | INFO | Does +0.1s cooldown apply during sprint or only after? Unclear. |
| **Tier stacking undefined** | INFO | If Tier 4 AND Tier 5 đang hoạt động simultaneously, do effects stack or replace? |
| **Feedback loop** | WARNING | Low Ward → Tier 4 → harder navigation → time runs out (same as Scenario 3). |

**Issues Found**:
- [INFO] Tier stacking rules (Tier 4 → Tier 5) undefined. Clarify stacking behavior.
- [INFO] "Increased dash cooldown +0.1s" ambiguous. Clarify application window.

---

## Scenario 5: Collect Bone Relic During Active Boss Sweep

**Systems Involved**: Map Director, Bộ điều khiển người chơi, Resource Effects (not designed!), Máu/thể lực, Mục tiêu miếu

**Trigger**:
- Player presses E near CursedMound (Mo Oan) with Bone Relic
- Searchlight sweep đang hoạt động
- Player currently in cover

**Sequence**:
1. Map Director executes sweep cycle
2. Map checks player exposure: is_exposed = false (in cover)
3. Bộ điều khiển người chơi registers E key near CursedMound
4. Bộ điều khiển người chơi sends OnResourcePickedUp(NgocCot) to Resource Effects
5. Resource Effects applies Time Drain modifier
6. Bone Relic added to inventory
7. Máu/thể lực receives Time Drain activation
8. Máu/thể lực updates effective drain to 3.0/sec
9. Player still in cover during đang hoạt động sweep
10. Sweep telegraph completes, still in cover
11. Exposure still FALSE → NO STRIKE
12. Player exits cover with Bone Relic → exposed with 3x drain

**Data Flow Analysis**:
- ✅ Bộ điều khiển người chơi → Resource Effects: pickup event clear
- ✅ Resource Effects → Máu/thể lực: Time Drain applied
- ⚠️ **CRITICAL**: Resource Effects GDD DOES NOT EXIST. Time Drain spec is provisional.
- ⚠️ Hallucination timing undefined: immediate or delayed?

**Failure Modes**:

| Issue | Severity | Description |
|-------|----------|-------------|
| **Missing design** | WARNING | Resource Effects GDD not designed. Time Drain activation, hallucination details, inventory cap undefined. |
| **Ambiguous timing** | INFO | Hallucination VFX appears when? During pickup or when exiting cover? |
| **Compounding difficulty** | WARNING | Relic pickup + Tier 4 panic + sweep = unfair combined difficulty with Scenario 3. |

**Issues Found**:
- [WARNING] Resource Effects GDD not designed. Time Drain timing and hallucination package undefined.
- [WARNING] Combining Scenario 5 (relic pickup) + Scenario 3 (sweep + Tier 4) creates unfair difficulty stack.
- [INFO] Hallucination activation timing ambiguous.

---

## Summary by Severity

### BLOCKERS: 4

1. **Scenario 1** — Shadow crowding auto-push + auto-complete fire simultaneously, burning souls before lựa chọn
2. **Scenario 1** — Shadow nên freeze IMMEDIATELY on auto-complete, not continue shrinking
3. **Scenario 2** — Bộ xử lý hậu quả writes before Map validates spawn. If spawn fails, NPC locked with no retry path.
4. **Scenario 3** — Strike warning obscured by Tier 4 chromatic aberration. Player can't see fair warning.

### WARNINGS: 3

1. **Scenario 3** — Bone Relic (2x) + sprint (-5s) + strike (-30s) + Tier 4 panic = unbounded difficulty spike (60+ sec loss)
2. **Scenario 3** — Feedback loop: Low Ward → Tier 4 effects → sprint → faster drain → more panic. No brake.
3. **Scenario 5** — Resource Effects GDD not designed. Time Drain timing and hallucination details undefined.

### INFO: 2

1. **Scenario 1** — Auto-complete triggers silently. No UI feedback.
2. **Scenario 4** — Tier 4 → Tier 5 effect stacking rules undefined. Effect combinations unclear.

---

## Critical Findings & Recommendations

### CRITICAL: Scenario 3 Unfair Difficulty Phải Be Fixed Before Release

**The problem**: Bone Relic (2x drain) + sprint (-5s) + strike (-30s) + Tier 4 panic effects combine into **unbounded difficulty spike**. One sweep while sprinting with Bone Relic can delete 60+ seconds. Unfair and contradicts "readable survival pressure" design pillar.

**Required fixes**:
1. Draw strike warning icon in 3D world space (above chromatic aberration)
2. Cap strike penalty at 15s if player carries Bone Relic (vs. normal 30s)
3. Stress-test route viability: "player hit twice carrying Bone Relic, can reach shrine?"
4. Add Tier 4 effect governor: auto-downgrade to Tier 3 after 30 sec continuous

### CRITICAL: Scenario 2 System Ordering Phải Be Fixed

**The problem**: Bộ xử lý hậu quả writes NightOutcomeState BEFORE Map validates spawn. If spawn kiểm tra hợp lệ fails, NPC Model locked and cannot retry. Breaks recovery path.

**Required fix**:
1. Reorder: Map kiểm tra hợp lệ FIRST, then Bộ xử lý hậu quả invoked
2. Add trạng thái rollback: release NPC lock if spawn kiểm tra hợp lệ fails

### CRITICAL: Scenario 1 Atomicity Phải Be Fixed

**The problem**: Shadow shrinking continues while auto-complete fires. Souls can be thermally burned before being formally selected, creating corrupted run data.

**Required fixes**:
1. Shadow freezes IMMEDIATELY on auto-complete timeout
2. Abort auto-complete if soul already burned; force manual lựa chọn
3. Add thermal death check before finalizing lựa chọn pattern

---

## Bước tiếp theo

1. **Update Game Máy trạng thái GDD** — Add explicit note: "Map kiểm tra hợp lệ before Bộ xử lý hậu quả"
2. **Update Quản lý không gian bóng GDD** — Specify: "Shadow freezes IMMEDIATELY on auto-complete, not after"
3. **Design Resource Effects GDD** — Define Time Drain timing, hallucination package, inventory limits
4. **Add stress-test scenarios** to acceptance criteria for Scenario 3
5. **Implement 3D world-space strike warning** instead of 2D screen-space
6. **Add Tier 4 duration governor** (30 sec max before downgrade to Tier 3)
7. **Cap strike penalty** at 15s when carrying Bone Relic
8. **Clarify Tier effect stacking** in Máu/thể lực GDD

---

## Conclusion

Phase 4 analysis has identified **4 game-breaking blockers** that phải be fixed before vertical slice testing:

1. **Shadow/auto-complete race condition** corrupting run data
2. **Bộ xử lý hậu quả ordering** preventing fallback recovery
3. **Strike warning visibility** violating fairness principle
4. **Unbounded difficulty spike** from compounding drain mechanics

All blockers have clear reproduction steps and recommended fixes in this document.
