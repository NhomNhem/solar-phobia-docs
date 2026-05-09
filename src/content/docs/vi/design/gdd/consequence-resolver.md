---
title: 'Bộ xử lý hậu quả$'
description: 'Bản dịch tiếng Việt cho Bộ xử lý hậu quả$.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Approved$
> **Author**: User + opencode$
> **Last Updated**: 2026-05-06$
> **Implements Pillar**: Consequence-driven survival loop with day/night emotional contrast$

## Tổng quan$

Bộ xử lý hậu quả is the moral arithmetic of Solar Phobia's night phase—it reads the abandoned soul from Day Service's lựa chọn payload and chuyển đổi that choice into a physical curse that hunts the player. The hệ thống owns the curse mapping logic, the NightOutcomeState write, and the xác định assignment that ensures "the person you left behind becomes your nightmare." During `Khóa lựa chọn`, it receives the `SelectionConfirmed(payload)` from Game Máy trạng thái, extracts the `abandoned_soul_id`, and writes one of {`Drag`, `Block`, `FakeShrine`} to `NightOutcomeState`. Without this hệ thống, the game's "consequence-driven" identity collapses—there's no link between who you abandoned and what hunts you at night.

## Player Fantasy$

The player nên feel **"this is my fault"** — the curse that hunts them at night is a direct manifestation of the person they abandoned. There's no randomness here; the water trap, blood net, or collapsing platform exists *because* you left that specific soul behind. The fantasy is **ownership of horror** — "I made this nightmare, and now I phải survive it."

Each curse nên feel distinct and personal:
- **Linh (Water Trap)**: Nên feel like drowning in guilt — constant, inescapable drain.
- **Van (Blood Net)**: Nên feel like being hunted and restrained — sudden, sticky, suffocating.
- **Minh (Illusion)**: Nên feel deceptive and terrifying — the ground itself betrays you.

The emotional promise: **"The person you left behind is now your nightmare."** The curse isn't a generic hazard; it's *that specific soul* punishing your choice.

## Detailed Design$

### Lõi Rules$

1. **Trigger**: Bộ xử lý hậu quả is invoked by Game Máy trạng thái during `Khóa lựa chọn` phase when `SelectionConfirmed(payload)` is received.
2. **Prerequisite**: Bộ xử lý hậu quả only executes AFTER Điều phối map và spawn validates spawn bundle. If Map kiểm tra hợp lệ fails, Bộ xử lý hậu quả is NOT invoked (trạng thái remains in Khóa lựa chọn, transitions to Lỗi nghiêm trọng).
3. **Payload Read**: Extract `abandoned_soul_id` from the payload. This is the soul the player left behind.
4. **Curse Mapping** (xác định):
   - `Linh` (abandoned) → `NightOutcomeState = Drag` (Water Trap — Nước Dâng).
   - `Van` (abandoned) → `NightOutcomeState = Block` (Blood Net — Lưới Máu).
   - `Minh` (abandoned) → `NightOutcomeState = FakeShrine` (Illusion — Ảo Ảnh).
5. **Model Write**: Write `NightOutcomeState` to Mô hình dữ liệu NPC/linh hồn for the abandoned soul only.
6. **Curse Payload**: Send curse type, intensity, and location bias to:
   - Điều phối map và spawn (spawn bias for night hazards).
   - Module hiệu ứng nguyền rủa (visual/audio effects for night).
7. **One-Write Rule**: Bộ xử lý hậu quả writes `NightOutcomeState` exactly once per run. Contradictory writes are rejected.

### States and Transitions$

| State | Entry Condition | Exit Condition | Behavior |
|-------|-----------------|----------------|----------|
| Idle | `Khóa lựa chọn` phase + payload received | Abandoned soul mapped | Read payload; compute curse mapping using Master GDD contract |
| Writing | Curse mapped | `NightOutcomeState` written | Write outcome to NPC Model; prepare curse payload |
| Done | `NightOutcomeState` written | Payload sent to downstream hệ thống | Send curse type to Map Director, Curse Modules |

### Interactions with Other Systems$

- **Trạng thái game / Máy trạng thái phase -> Bộ xử lý hậu quả**: Sends `SelectionConfirmed(payload)` with `abandoned_soul_id`. Triggers resolver during `Khóa lựa chọn`.

- **Mô hình dữ liệu NPC/linh hồn <-> Bộ xử lý hậu quả**: 
  - Reads `SoulId`, `DaySelectionState` for the abandoned soul.
  - Writes `NightOutcomeState` = `Drag`/`Block`/`FakeShrine` for abandoned soul only.
  - Validates one-write rule (rejects duplicate writes).

- **Điều phối map và spawn <- Bộ xử lý hậu quả**: Receives curse type and intensity for night spawn bias:
  - `Drag` (Linh) → Mo Oan (CursedMound) placement, Water Trap zones.
  - `Block` (Van) → Lưới Máu (Blood Net) hazards, reduced visibility. 
  - `FakeShrine` (Minh) → FalseSafeMound (Ảo Ảnh) hazards, illusory platforms. 

- **Module hiệu ứng nguyền rủa <- Bộ xử lý hậu quả**: Receives curse type for night visual/audio effects:
  - `Drag` → Water sound layers, blue tint, drowning VFX. 
  - `Block` → Blood net VFX, red tint, restraint sounds. 
  - `FakeShrine` → Illusion VFX, ground collapse, deceptive platforms. 

## Formulas$

Bộ xử lý hậu quả uses xác định lookup (no mathematical formulas). The core mapping is:

| Abandoned Soul | NightOutcomeState | Curse Loại | Intensity | Downstream Effects |
|-------------|-------------------|------------|-----------|-------------------|
| `Linh` | `Drag` | Water Trap (Nước Dâng) | 1.0 (constant) | Map: Mo Oan (CursedMound) placement, Water Trap zones; Curse: blue tint, drowning VFX |
| `Van` | `Block` | Blood Net (Lưới Máu) | 1.0 (constant) | Map: Lưới Máu (Blood Net) hazards, reduced visibility; Curse: red tint, restraint sounds |
| `Minh` | `FakeShrine` | Illusion (Ảo Ảnh) | 1.0 (constant) | Map: FalseSafeMound (Ảo Ảnh) hazards, illusory platforms; Curse: ground collapse, deceptive VFX |

### Payload Structure
Sent to downstream hệ thống (`Điều phối map và spawn`, `Module hiệu ứng nguyền rủa`):
```json
{
  "curse_type": "Drag" | "Block" | "FakeShrine",
  "intensity": 1.0,
  "spawn_bias": { "abandoned_soul_id": "Linh" | "Van" | "Minh" }
```

**Expected output**: Curse type string + intensity float + spawn bias object.  
**Edge case**: If abandoned soul ID not in {Linh, Van, Minh}, emit `InvalidSoulId` error and default to `Drag`.

*Provisional: Downstream GDDs (Module hiệu ứng nguyền rủa, Chạy sinh tồn ban đêm) are undesigned; payload structure may evolve.*

## Edge Cases$

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| Invalid `abandoned_soul_id` (not in {Linh, Van, Minh}) | Reject write, emit `InvalidSoulId` error, set NightOutcomeState = `Drag` (default) | Prevents undefined curse mapping |
| Duplicate write attempt (same run) | Reject write, emit `DuplicateWrite` error, keep initial valid trạng thái | Enforces one-write rule |
| Day Service sends malformed payload (missing soul_id) | Reject, emit `InvalidPayload` error, enter `Lỗi nghiêm trọng` in Trạng thái game | Preserves contract integrity |
| Downstream hệ thống (Map/Curse) not ready | Send payload anyway; downstream ignores if not in Sinh tồn ban đêm phase | Decouples timing, but may need retry later |
| Bộ xử lý hậu quả fails to compute (bug) | Return default `Drag`, emit `ResolverFailed` warning | Graceful degradation, ensures night can start |
| All souls saved (0 abandoned) — impossible per Day Service rule | If occurs (bug), default to `Drag` | Fallback for invalid trạng thái |

## Dependencies$

### Upstream (This depends on):
| System | Direction | Nature of Dependency |
|--------|-----------|---------------------|
| Day Service & Selection | This depends on it | **Hard**: receives `SelectionConfirmed(payload)` with `abandoned_soul_id`. Cannot map without this. |
| Mô hình dữ liệu NPC/linh hồn | This depends on it | **Hard**: reads `SoulId`, `DaySelectionState` for abandoned soul. Writes `NightOutcomeState`. |
| Trạng thái game / Máy trạng thái phase | This depends on it | **Hard**: invoked on `Khóa lựa chọn`; phải return curse payload before Night. |

### Downstream (Depends on this):
| System | Direction | Nature of Dependency |
|--------|-----------|---------------------|
| Module hiệu ứng nguyền rủa | Depends on this | **Soft**: receives curse type from payload for visual/audio effects. |
| Điều phối map và spawn | Depends on this | **Soft**: receives curse type + bias for night hazard placement. |
| Đèn quét boss Cá Ông | Depends on this | **Soft**: reads curse type for AI behavior (e.g., Lưới Máu affects searchlight). |
| Chạy sinh tồn ban đêm | Depends on this | **Hard**: curse type defines core hazards the player phải survive. |
| Ngọc Cốt / Relic System | Depends on this | **Soft**: curse type may affect relic spawn bias. |

### Interface ownership:
- **Bộ xử lý hậu quả owns** curse mapping logic, payload structure, one-write rule.
- **Day Service owns** `abandoned_soul_id` assignment.
- **NPC Model owns** `NightOutcomeState` write.

## Tuning Knobs$

No tunable parameters for vertical slice — curse mapping is fully xác định. Future expansion may add:

| Parameter | Current Value | Safe Range | Effect of Increase | Effect of Decrease |
|-----------|---------------|------------|-------------------|-------------------|
| `curse_intensity_multiplier` | 1.0 | 0.5-3.0 | Stronger curse effects (harder night) | Weaker curses (easier night) |
| `default_cursetype` | `Drag` | {Drag, Block, FakeShrine} | Changes fallback for invalid soul ID | N/A |

**Interacting Knobs:**
- `curse_intensity_multiplier` multiplies base intensity sent to Module hiệu ứng nguyền rủa/Map Director.
- These knobs are provisional — downstream GDDs (Module hiệu ứng nguyền rủa) are not designed yet.

## Visual/Audio Yêu cầu$

| Event | Visual Feedback | Audio Feedback | Độ ưu tiên |
|-------|-----------------|----------------|----------|
| Curse Assigned (Linh → Drag) | Blue tint, water ripple VFX, drowning overlay | Water sound layers, bubbling, distant drowning | High |
| Curse Assigned (Van → Block) | Red tint, blood net overlay, restraint VFX | Blood net tension sounds, rattling chains | High |
| Curse Assigned (Minh → FakeShrine) | Illusion shimmer, ground crack VFX, deceptive platforms | Ground collapse rumble, deceptive whisper | High |
| Payload Sent to Map/Curse | Confirmation ping, curse icon appears | Short tension stinger | Medium |

## UI Yêu cầu$

| Information | Display Location | Update Frequency | Condition |
|-------------|------------------|------------------|-----------|
| Curse type preview (optional) | Quyết định panel footer | On lock commit | Khóa lựa chọn |
| Curse icon (Linh/Van/Minh) | HUD top-right | On curse assignment | Sinh tồn ban đêm |
| No direct UI — hệ thống runs in background | N/A | N/A | Always |

## Tiêu chí chấp nhận$

- [ ] **Curse Mapping**: Deterministic lookup Linh→Drag, Van→Block, Minh→FakeShrine. No randomness.
- [ ] **One-Write Rule**: Writes `NightOutcomeState` exactly once per run. Contradictory writes rejected.
- [ ] **Invalid Soul ID**: Rejects writes for soul IDs not in {Linh, Van, Minh}, emits `InvalidSoulId` error.
- [ ] **Duplicate Write**: Rejects second write attempt, emits `DuplicateWrite` error.
- [ ] **Payload Delivery**: Sends curse type, intensity=1.0, spawn bias to Map Director + Module hiệu ứng nguyền rủa.
- [ ] **Hiệu năng**: curse mapping completes within 0.1ms average on target PC.
- [ ] **Cross-System Events**: Verified that Map Director and Module hiệu ứng nguyền rủa receive payload reliably.

## Open Questions$

| Question | Owner | Deadline | Resolution |
|----------|-------|----------|------------|
| Nên curse intensity scale with game progress (chapter/act)? | Game Designer | Before post-vertical slice | Open |
| Nên default curse for invalid soul ID be configurable (currently Drag)? | Systems Designer | Before MVP lock | Open |
| How nên payload structure evolve when Module hiệu ứng nguyền rủa GDD is written? | Systems Designer | Before Feature layer design | Open |
| Nên curse assignment be visible to player before night starts? | UX-Designer | Before first playtest | Open |