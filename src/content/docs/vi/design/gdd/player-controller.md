---
title: 'Bộ điều khiển người chơi'
description: 'Bản dịch tiếng Việt cho Bộ điều khiển người chơi.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Approved
> **Author**: User + opencode
> **Last Updated**: 2026-05-06
> **Implements Pillar**: Consequence-driven survival loop with day/night emotional contrast

## Tổng quan

Bộ điều khiển người chơi là hệ thống input và di chuyển, chuyển hành động của người chơi thành phản hồi trong game, đồng thời áp đặt những gì người chơi được hoặc không được làm theo phase hiện tại. During phase ban ngày, the player is restricted to tương tác chỉ qua UI—selecting NPCs, assigning tài nguyên (tea/incense/offering), and confirming choices—with no di chuyển vật lý allowed. During phase ban đêm, the hệ thống enables WASD/arrow di chuyển, sprint, and tương tác theo ngữ cảnh (E key) as the player navigates the lane from miếu bắt đầu to miếu kết thúc, using cover volumes (Mo Thuong, Mo Oan, FalseSafeMound) to avoid boss sweeps and collecting optional Bone Relics. The hệ thống exists to make phase transitions feel distinct: daytime is calm and deliberate (menu-driven), nighttime is urgent and physical (di chuyển-driven). Without it, the game's day/night emotional contrast breaks because players could move during day (breaking the "choose who to save" tension) or be unable to traverse at night (breaking survival pressure).

## Player Fantasy

During phase ban ngày, the player nên feel **calm and deliberate**—a sense of thoughtful weight as they decide who to save and who to leave behind. Like *Papers, Please* or a strategy game, the UI-only tương tác creates distance and reflection; the player is an observer making moral choices, not a physical participant. The fantasy is "burden of leadership"—every click carries consequence, but there's no physical danger yet.

During phase ban đêm, the fantasy shifts dramatically to **panic and tension**—heart-pounding urgency where the player constantly looks over their shoulder. Drawing from *Amnesia: The Dark Descent* and *Outlast*, the player feels physically vulnerable and hunted, with only their reflexes and cover usage standing between survival and failure. The di chuyển WASD and cover mechanics nên reinforce "I am being chased and I cannot fight back"—pure survival flight, not combat.

The emotional promise is **ownership through contrast**: daytime calm makes the nighttime panic feel deserved, not ngẫu nhiên. When the player survives or fails, they nên liên hệ it to their lựa chọn trước đó, not to cơ chế thiếu công bằng.

## Detailed Design

### Lõi Rules

1. **Phase-Gated Input**: Input processing is determined by phase hiện tại from Game Máy trạng thái:
   - `Dịch vụ ban ngày`: Only UI clicks (NPC lựa chọn, tài nguyên assignment, confirm button). WASD/mouse di chuyển is ignored.
   - `Sinh tồn ban đêm`: di chuyển WASD, Shift (sprint), E (contextual interact), mouse-look. UI lựa chọn clicks are ignored.
   - `Khóa lựa chọn`, `Resolve`, `Reset`: All input bị tắt except skip/continue prompts.

2. **Movement (Night Only)**: WASD keys drive horizontal di chuyển relative to camera facing. Player speed is `base_move_speed` (configurable tuning knob).

3. **Sprint**: Holding Shift activates sprint, consuming stamina per second from Máu/thể lực hệ thống. Sprint speed = `base_move_speed * sprint_multiplier`. Releasing Shift or stamina depletion returns to base speed.

4. **Cover System**: Player collider phải be **fully inside** a cover volume (Mo Thuong, Mo Oan, FalseSafeMound) for cover to register. Partial overlap does NOT count as "in cover" for sweep exposure checks.

5. **Contextual Interact (E key)**:
   - Near CursedMound (Mo Oan): Picks up Bone Relic (`Ngoc Cot`), triggering Time Drain modifier and hallucination package.
   - Near Shrine (EndShrine): Triggers shrine arrival event to Game Máy trạng thái.
   - Near FalseSafeMound: Warning tell plays; player can choose to hide (risky) or avoid.

6. **Camera**: Mouse-look controls camera rotation (Y-axis only for vertical lane). No manual camera zoom. Camera pans smoothly behind player during phase ban đêm.

7. **No Combat Input**: Player has no attack, block, or counter inputs. Survival is flight-only, matching the "helpless flight" fantasy.

### States and Transitions

| State | Entry Condition | Exit Condition | Behavior |
|-------|-----------------|----------------|----------|
| DayUI | `Dịch vụ ban ngày` phase đang hoạt động | Phase exits `Dịch vụ ban ngày` | Ignore WASD/mouse di chuyển; process only UI clicks on NPCs/tài nguyên; show cursor |
| NightMovement | `Sinh tồn ban đêm` phase đang hoạt động | Phase exits `Sinh tồn ban đêm` | Process WASD/mouse-look; enable sprint; enable cover detection; enable E-interact; hide cursor |
| Disabled | `Khóa lựa chọn`, `Resolve`, `Reset` phases | Phase exits to `Dịch vụ ban ngày` or `Sinh tồn ban đêm` | Ignore all input except continue/skip prompts |

### Interactions with Other Systems

- **Trạng thái game / Máy trạng thái phase -> Bộ điều khiển người chơi**: Receives phase change event (`OnDayStart`, `OnNightStart`, `OnChoiceLock`, `OnResolve`, `OnReset`). Controller switches input mode and cursor visibility based on phase.

- **Điều phối map và spawn <-> Bộ điều khiển người chơi**: 
  - Controller sends player position + collider bounds to Map Director for cover kiểm tra hợp lệ.
  - Map Director sends `OnEnterCover`, `OnExitCover`, `OnStrikeWarning` event to Controller.
  - Controller displays strike warning icon near reticle when `OnStrikeWarning` received.

- **Máu/thể lực & Luật sát thương <-> Bộ điều khiển người chơi**:
  - Controller sends sprint trạng thái (đang hoạt động/không hoạt động) to stamina hệ thống for drain calculation.
  - Stamina hệ thống sends `OnStaminaDepleted` to Controller; Controller forces exit from sprint.
  - Bộ đếm ward event (`OnWardTimerCritical`, `OnWardTimerEmpty`) are received; Controller can trigger death animation/failure.

- **Resource Effects <- Bộ điều khiển người chơi**: Bone Relic pickup (E key on CursedMound) triggers `OnResourcePickedUp(NgocCot)` event to Resource Effects hệ thống for Time Drain activation.

- **HUD & Diegetic Feedback <- Bộ điều khiển người chơi**: Controller sends current trạng thái (phase, sprint đang hoạt động, in cover, strike warning) to HUD for real-time display updates.

## Formulas

### Effective Move Speed

```
effective_speed = base_move_speed * (is_sprinting ? sprint_multiplier : 1.0)
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| base_move_speed | float | 2.0-8.0 | config | Base di chuyển WASD speed |
| is_sprinting | bool | {0,1} | runtime input | Shift key held and stamina > 0 |
| sprint_multiplier | float | 1.5-3.0 | config | Speed multiplier when sprinting |

**Expected output range**: 2.0-24.0 units/sec  
**Edge case**: clamp to max speed cap; if stamina depletes mid-sprint, immediately drop to base speed.

---

### Phase Input Validation

```
input_allowed = (current_phase in allowed_phases[input_type])
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| current_phase | enum | {Dịch vụ ban ngày, Khóa lựa chọn, Sinh tồn ban đêm, Resolve, Reset} | Game Máy trạng thái | Active phase |
| allowed_phases | map[input_type] → phase_set | — | config | Maps input types to allowed phases |
| input_type | enum | {UI_Click, WASD_Move, Sprint, Interact} | runtime | Loại of input received |

**Expected output range**: boolean  
**Edge case**: if `input_allowed = false`, silently consume input (no error popup) to avoid breaking immersion.

---

*Note: Stamina drain during sprint is calculated by **Máu/thể lực & Luật sát thương** (Bộ điều khiển người chơi only sends `is_sprinting` trạng thái). Bộ đếm ward penalties from strikes are calculated by **Điều phối map và spawn** (Bộ điều khiển người chơi receives penalty event).*

## Edge Cases

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| Player tries to sprint with 0 stamina | Sprint input ignored; `is_sprinting = false` sent to stamina hệ thống; player stays at base speed | Prevents negative stamina; no frustrating "try to run but can't" visual |
| Player is in cover when strike hits | If fully inside valid cover (Mo Thuong), strike damage negated. If partial cover, full penalty applies | Matches Điều phối map và spawn cover validity rules |
| Player presses E with no interactable nearby | Silently ignore (no error popup) | Prevents UI clutter; player learns by experimentation |
| Phase changes mid-sprint (Night ends) | Immediately disable WASD/sprint/interact; reset to DayUI trạng thái; send `OnSprintEnd` to stamina hệ thống | Clean trạng thái transition; no orphaned sprint drain |
| Player stuck in geometry at night | If position unchanged for `stuck_timeout_sec` (3 sec) with đang hoạt động input, teleport to nearest valid navmesh point; log warning | Prevents soft-lock without player noticing |
| Multiple strike warnings overlap | Display only nearest/highest-priority warning icon near reticle | Avoids UI clutter during panic moments |
| Bone Relic pickup during strike telegraph | Apply Time Drain immediately; do NOT cancel strike (per Điều phối map và spawn rule) | Player chose the risk; consistent timing |
| Stamina depletes mid-sprint | Receive `OnStaminaDepleted` from Máu/thể lực; immediately disable sprint, return to base speed | Graceful degradation; player feels consequence, not bug |
| FalseSafeMound collapse while player inside | Player gets knockback + Bộ đếm ward penalty; treat as exposed strike hit | Fair: warning tell was given; player chose to stay |
| Cursor shows during phase ban đêm | Force-hide cursor on `Sinh tồn ban đêm` entry | Maintains immersion; WASD+mouselook only |

## Dependencies

| System | Direction | Nature of Dependency |
|--------|-----------|---------------------|
| Trạng thái game / Máy trạng thái phase | This depends on it | **Hard**: receives phase change event (`OnDayStart`, `OnNightStart`, `OnChoiceLock`, `OnResolve`, `OnReset`). Controller switches input mode and cursor visibility based on phase. |
| Điều phối map và spawn | This depends on it | **Hard**: receives cover zone overlap event (`OnEnterCover`, `OnExitCover`, `OnStrikeWarning`). Sends player position + collider bounds for cover kiểm tra hợp lệ. |
| Máu/thể lực & Luật sát thương | Bidirectional | **Hard**: sends `is_sprinting` trạng thái for stamina drain. Receives `OnStaminaDepleted` (exit sprint) and Bộ đếm ward event (`OnWardTimerCritical`, `OnWardTimerEmpty`) for death/failure. |
| Resource Effects | This feeds it | **Soft**: sends `OnResourcePickedUp(NgocCot)` event when player picks up Bone Relic from CursedMound. |
| Mục tiêu miếu & Luật thắng/thua | Depends on this | **Hard**: receives player shrine arrival event (E key near EndShrine). Determines win condition. |
| Module hiệu ứng nguyền rủa | Depends on this | **Hard**: reads player position, sprint trạng thái, and cover trạng thái to apply curse effects (hallucinations, speed modifiers). |
| Boss Chase AI | Depends on this | **Hard**: reads player position for searchlight targeting and chase behavior. |
| Chạy sinh tồn ban đêm | Depends on this | **Hard**: player di chuyển and survival mechanics are central to night survival loop. |
| HUD & Diegetic Feedback | Depends on this | **Soft**: subscribes to player trạng thái changes (phase, sprint đang hoạt động, in cover, strike warning) for real-time HUD updates. |

## Tuning Knobs

| Parameter | Current Value | Safe Range | Effect of Increase | Effect of Decrease |
|-----------|---------------|------------|-------------------|-------------------|
| `base_move_speed` | 5.0 | 2.0-8.0 | Player outruns boss easily; loses tension | Frustrating; can't reach shrine in time |
| `sprint_multiplier` | 1.8 | 1.5-3.0 | Trivializes night survival; stamina burns faster | Sprint feels useless; stamina waste |
| `stuck_timeout_sec` | 3.0 | 2.0-5.0 | Player stays stuck too long; frustration | Premature teleport; feels glitchy |
| `cover_enter_threshold` | 1.0 | 0.8-1.0 | Easier to claim cover; less chính xác di chuyển needed | Frustrating; even "almost covered" fails |

**Interacting Knobs:**
- `base_move_speed` + `sprint_multiplier` together determine max speed. Increasing both makes night too easy.
- `sprint_multiplier` interacts with Máu/thể lực's `stamina_drain_per_sec` — higher multiplier = more stamina burned per second at max speed.

## Visual/Audio Yêu cầu

| Event | Visual Feedback | Audio Feedback | Độ ưu tiên |
|-------|-----------------|----------------|----------|
| Enter Dịch vụ ban ngày | Cursor appears; UI panels fade in; warm color grade | Calm ambient bed fades in | High |
| Enter Sinh tồn ban đêm | Cursor hides; cold color grade; vignette increase | Threat motif + louder wind/wave layer | Critical |
| Sprint Active | Slight FOV increase; motion blur; dust particles | Heavy breathing; footstep frequency increases | Medium |
| Enter Cover (Mo Thuong) | Player model crouches/anim; cover highlight glow | Soft "whisper" bed; muffled exterior sounds | High |
| Exit Cover | Player stands; cover glow fades | Exterior sounds return to full volume | High |
| Strike Warning | Ground warning shimmer near player; reticle warning icon | Rising crack sound; heartbeat intensifies | Critical |
| Strike Hit | Screen shake; red flash; knockback animation | Loud impact hit; distortion layer | Critical |
| Bone Relic Pickup | Vignette tighten + grain surge; green tint | Breath/crack/chant layer | High |
| Shrine Arrival (Success) | Shrine glow bloom; soft fade to white | Relief stinger; tension drop | Medium |
| Death/Failure | Rapid darken; camera fade to black | Distorted hit + low drone | Medium |

## UI Yêu cầu

| Information | Display Location | Update Frequency | Condition |
|-------------|------------------|------------------|-----------|
| Current phase (Day/Night icon) | Top-center | On phase change | Always |
| Sprint đang hoạt động indicator | Near player (stamina bar) | Real-time | phase ban đêm, sprint đang hoạt động |
| In cover indicator | Near player reticle | Real-time (enter/exit) | phase ban đêm, near cover volume |
| Strike warning icon | Near reticle | On `OnStrikeWarning` event | phase ban đêm, exposed in sweep |
| Stamina bar | Bottom-center HUD | Real-time | phase ban đêm, sprint available |
| Bone Relic carried indicator | Top-right inventory slot | On pickup/drop | phase ban đêm, carrying relic |
| Shrine direction cue | Edge of screen (arrow) | Real-time | phase ban đêm, shrine not reached |

## Tiêu chí chấp nhận

- [ ] **Phase Gating**: During `Dịch vụ ban ngày`, WASD/mouse di chuyển is ignored; only UI clicks processed. Cursor is visible.
- [ ] **Phase Gating**: During `Sinh tồn ban đêm`, WASD/mouse-look works; UI clicks on NPCs ignored. Cursor is hidden.
- [ ] **Phase Gating**: During `Khóa lựa chọn`, `Resolve`, `Reset`, all input ignored except skip/continue prompts.
- [ ] **Cover Validation**: Player collider fully inside Mo Thuong = "in cover" (sweep exposure check passes). Partial overlap = exposed.
- [ ] **Sprint Integration**: Holding Shift activates sprint, sends `is_sprinting = true` to Máu/thể lực. Stamina drains per second.
- [ ] **Sprint Integration**: Releasing Shift or stamina = 0 sends `is_sprinting = false`. Speed returns to base.
- [ ] **E-Interact (Bone Relic)**: Near CursedMound, E key picks up Bone Relic, triggers `OnResourcePickedUp(NgocCot)` event to Resource Effects hệ thống.
- [ ] **E-Interact (Shrine)**: Near EndShrine, E key triggers shrine arrival event to Game Máy trạng thái.
- [ ] **Strike Warning**: On receiving `OnStrikeWarning` from Map Director, display warning icon near reticle. **Critical**: Warning icon phải have z-order priority above Tier 4 panic effects (chromatic aberration) per Máu/thể lực GDD. If 2D screen-space, use highest layer; if 3D world-space, ensure not obscured by post-processing.
- [ ] **Phase Transition Clean**: On `Sinh tồn ban đêm` exit, sprint bị tắt, E-interact bị tắt, cursor shown. No orphaned trạng thái.
- [ ] **Hiệu năng**: Input processing completes within 1ms average per frame on target PC.
- [ ] **Cross-System Events**: Verify event sent to Map Director (position, cover trạng thái), Máu/thể lực (sprint trạng thái), Resource Effects (relic pickup), HUD (trạng thái changes) are delivered reliably.

## Open Questions

| Question | Owner | Deadline | Resolution |
|----------|-------|----------|------------|
| Nên sprint have a cooldown after stamina depletion? | Systems Designer | Before prototype test #1 | Open |
| Nên cover entry/exit have animation locks (can't sprint immediately after entering cover)? | Game Designer | Before vertical slice lock | Open |
| Nên strike warning icon be 3D world-space or 2D screen-space? | UX-Designer | Before UI implementation | Open |
| Nên Bone Relic pickup be automatic on entry or require E press? | Game Designer | Before vertical slice lock | Resolved: E press (player choice matters) |
