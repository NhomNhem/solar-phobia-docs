---
title: 'Mục tiêu miếu & Luật thắng/thua'
description: 'Bản dịch tiếng Việt cho Mục tiêu miếu & Luật thắng/thua.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Approved
> **Author**: User + opencode
> **Last Updated**: 2026-05-06
> **Implements Pillar**: Consequence-driven survival loop with day/night emotional contrast

## Tổng quan

Mục tiêu miếu & Luật thắng/thua defines the conditions that end the night survival phase—specifically, what constitutes a "win" (reaching the EndShrine) and a "lose" (Bộ đếm ward reaching zero). The hệ thống owns the win/lose detection logic, the shrine arrival event flow, and the failure/death sequence. During Sinh tồn ban đêm phase, the player phải navigate from StartShrine to EndShrine (Am Tho Bai Thuyen) while their Bộ đếm ward (Nuoc Mam Cot) counts down from the initial value set during Phase ban ngày. Reaching the shrine triggers the win condition, sending a shrine arrival event to Game Máy trạng thái for transition to Resolve. If the Bộ đếm ward depletes before shrine arrival, the player dies and the whale devours them—triggering the lose condition and transition to Resolve (failure path). Without this hệ thống, the night survival loop has no goal and no failure trạng thái—the player would run forever with no consequence.

## Player Fantasy

The player nên feel **desperate hope** as they run toward the EndShrine—each step closer is a step away from the whale's jaws. Reaching the shrine nên bring an overwhelming sense of **relief and salvation**—the nightmare ends, the whale won't get you, your choices mattered. The shrine glow (visual feedback) and relief stinger (audio) nên make this feel like a genuine escape from death.

Conversely, the losing condition—Bộ đếm ward reaching zero—nên feel like **inescapable consequence**. The player isn't killed by a bug or bad design; they're devoured because their day choices left them with too little Bộ đếm ward to survive the night. The fantasy is "the whale I abandoned has finally caught me"—a direct result of the soul I left behind during Phase ban ngày. The rapid darken, camera fade to black, and distorted impact sound nên feel like being swallowed whole—final, absolute, and entirely deserved.

The emotional promise: **Your day choices determine if you escape or get eaten.** The shrine is salvation earned through sacrifice; the whale is judgment for cowardice.

## Detailed Design

### Lõi Rules

1. **Win Detection**: When player presses E key within EndShrine trigger zone during `Sinh tồn ban đêm`, send `OnShrineReached` event to Game Máy trạng thái.
2. **Lose Detection**: When Bộ đếm ward (Nuoc Mam Cot) reaches 0, send `OnWardTimerEmpty` event to Game Máy trạng thái.
3. **Phase Validation**: Shrine can only be activated during `Sinh tồn ban đêm` phase. E key press during other phases is ignored.
4. **Single Shrine**: Only one EndShrine exists per night (single lane from StartShrine to EndShrine).
5. **Win Outcome**: `OnShrineReached` triggers Game Máy trạng thái to transition to `Resolve` (success path).
6. **Lose Outcome**: `OnWardTimerEmpty` triggers Game Máy trạng thái to transition to `Resolve` (failure path—whale devours player).
7. **Shrine Visual**: EndShrine glows when player is within approach distance (visual cue for win condition).

### States and Transitions

| State | Entry Condition | Exit Condition | Behavior |
|-------|-----------------|----------------|----------|
| NightActive | `Sinh tồn ban đêm` phase starts | Win or Lose condition met | Monitor Bộ đếm ward; detect shrine arrival via Bộ điều khiển người chơi E key |
| Win (Success) | E key pressed in EndShrine zone | Game Máy trạng thái transitions to `Resolve` | Send `OnShrineReached` event; play shrine glow bloom animation |
| Lose (Failure) | Bộ đếm ward = 0 | Game Máy trạng thái transitions to `Resolve` | Send `OnWardTimerEmpty` event; play death animation (swallowed by whale) |

### Interactions with Other Systems

- **Trạng thái game / Máy trạng thái phase <- Mục tiêu miếu**: Receives `OnShrineReached` (win) or `OnWardTimerEmpty` (lose) event. Transitions to `Resolve` trạng thái for outcome processing.

- **Bộ điều khiển người chơi -> Mục tiêu miếu**: Sends E key press event when player is near EndShrine. Mục tiêu miếu validates phase and proximity, then triggers win.

- **Máu/thể lực & Luật sát thương -> Mục tiêu miếu**: Sends `OnWardTimerEmpty` event when Bộ đếm ward reaches 0. Mục tiêu miếu forwards to Game Máy trạng thái as lose condition.

- **Điều phối map và spawn <-> Mục tiêu miếu**: Map Director owns EndShrine placement and trigger zone geometry. Mục tiêu miếu reads player proximity to shrine zone for win detection.

- **HUD & Diegetic Feedback <- Mục tiêu miếu**: Receives win/lose trạng thái changes for display updates (shrine direction cue, success/failure VFX).

## Formulas$

### Shrine Proximity Check

```
is_near_shrine = distance(player_position, shrine_center) <= shrine_trigger_radius
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| player_position | Vector2 | — | Bộ điều khiển người chơi | Current player world position |
| shrine_center | Vector2 | — | Điều phối map và spawn | EndShrine trigger zone center |
| shrine_trigger_radius | float | 2.0-5.0 | config | Radius for E key activation |

**Expected output range**: boolean  
**Edge case**: if shrine zone not loaded (Map Director failed), return false.

---

### Win Condition Check

```
win_triggered = is_near_shrine AND E_key_pressed AND (current_phase == NightSurvival)
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| is_near_shrine | bool | {0,1} | Shrine Proximity Check | Player within trigger zone |
| E_key_pressed | bool | {0,1} | Bộ điều khiển người chơi | E key down event |
| current_phase | enum | {Sinh tồn ban đêm} | Game Máy trạng thái | Phải be Sinh tồn ban đêm |

**Expected output range**: boolean  
**Edge case**: ignore E key if phase != Sinh tồn ban đêm (handled by Bộ điều khiển người chơi gating).

---

*Note: Bộ đếm ward initialization (`Initial_Ward_Sec = Base_Ward_Sec + (Ghosts_Saved * 30s) - Day_Penalties_Sec`) is defined in **Máu/thể lực & Luật sát thương**. Bộ đếm ward depletion (`Bộ đếm ward = 0`) triggers lose condition—Mục tiêu miếu only detects the threshold.*


## Edge Cases

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| Player presses E outside shrine zone | Silently ignore; no event sent | Prevents false win triggers |
| Bộ đếm ward = 0 exactly | Immediate lose; send `OnWardTimerEmpty` to Game Máy trạng thái | Death takes priority over win |
| Player reaches shrine + Ward = 0 simultaneously | Lose triggers (Ward = 0 = death); win is ignored | Death is absolute; whale devours you |
| Shrine zone not loaded (Map Director failed) | Win impossible; log error; continue night until Ward = 0 triggers lose | Graceful degradation; player gets alternate outcome |
| Multiple E presses near shrine | Debounce: ignore repeats within 0.5s window | Prevents duplicate `OnShrineReached` event |
| Player dies (Ward = 0) while in shrine zone | Lose triggers; win is ignored even if E was pressed | Death is final; whale gets you |
| E key pressed during wrong phase | Ignored by Bộ điều khiển người chơi phase gating; no event generated | Consistent with Phase behavioral rules |
| Shrine glow VFX plays, player doesn't press E | Shrine stays đang hoạt động; player can press E anytime while in zone | No timeout; player chooses when to win |
| Win triggers but Game Máy trạng thái not in Sinh tồn ban đêm | Log error; don't send event (shouldn't happen) | Defensive programming; validates trạng thái integrity |

## Dependencies

| System | Direction | Nature of Dependency |
|--------|-----------|---------------------|
| Trạng thái game / Máy trạng thái phase | This depends on it | **Hard**: sends `OnShrineReached` (win) or `OnWardTimerEmpty` (lose) event. Game Máy trạng thái transitions to `Resolve` trạng thái. |
| Bộ điều khiển người chơi | This depends on it | **Hard**: receives E key press event near EndShrine. Validates phase and proximity before triggering win. |
| Máu/thể lực & Luật sát thương | This depends on it | **Hard**: receives `OnWardTimerEmpty` event when Bộ đếm ward = 0. Forwards lose condition to Game Máy trạng thái. |
| Điều phối map và spawn | This depends on it | **Soft**: reads EndShrine location and trigger zone geometry for win detection. |
| HUD & Diegetic Feedback | Depends on this | **Soft**: subscribes to win/lose trạng thái changes for shrine glow VFX, success/failure audio and visual feedback. |
| Module hiệu ứng nguyền rủa | Depends on this | **Soft**: win/lose outcome may affect curse resolution in `Resolve` trạng thái. |
| Chạy sinh tồn ban đêm | Depends on this | **Hard**: win/lose conditions are central to night survival loop completion. |

## Tuning Knobs

| Parameter | Current Value | Safe Range | Effect of Increase | Effect of Decrease |
|-----------|---------------|------------|-------------------|-------------------|
| `shrine_trigger_radius` | 3.0 | 2.0-5.0 | Easier to trigger win (forgiving) | Miss E key presses; frustration |
| `shrine_glow_start_distance` | 15.0 | 10.0-30.0 | Player sees shrine earlier; less tension | Player surprised by shrine; anticlimactic |
| `debounce_window_sec` | 0.5 | 0.3-1.0 | Prevents duplicate win event reliably | May miss rapid re-presses |

**Interacting Knobs:**
- `shrine_trigger_radius` + `shrine_glow_start_distance` control player experience near shrine. Smaller radius with earlier glow gives player time to react.
- These knobs interact with Bộ điều khiển người chơi's E key sensitivity and Điều phối map và spawn's shrine placement.

## Visual/Audio Yêu cầu$

| Event | Visual Feedback | Audio Feedback | Độ ưu tiên |
|-------|-----------------|----------------|----------|
| Shrine Approach (within glow distance) | Shrine glow builds; soft light halo | Distant bell chime, low drone builds | High |
| Shrine Enter (trigger zone) | Bright glow bloom; path lights up | Relief stinger; tension drops | Critical |
| Win (E key pressed) | White fade to shrine interior; soft light | Success chime; whale song fades | Critical |
| Lose (Bộ đếm ward = 0) | Rapid darken; camera shakes; swallowed whole | Distorted impact; low drone; whale roar | Critical |
| Shrine Glow Idle | Pulsing soft glow in night | Low ambient hum near shrine | Medium |

## UI Yêu cầu$

| Information | Display Location | Update Frequency | Condition |
|-------------|------------------|------------------|-----------|
| Shrine direction cue (arrow) | Edge of screen (points to shrine) | Real-time during Sinh tồn ban đêm | phase ban đêm, shrine not reached |
| Shrine proximity indicator | Near player reticle (fills as approach) | Real-time when within glow distance | phase ban đêm, near shrine |
| Win/Lose status icon | Center-top (shrine icon) | On win/lose event | phase ban đêm |
| Shrine trigger zone visual | Ground marker at shrine base | Static | phase ban đêm, shrine loaded |

## Tiêu chí chấp nhận

- [ ] **Win Detection**: E key pressed within EndShrine trigger zone during `Sinh tồn ban đêm` sends `OnShrineReached` event to Game Máy trạng thái.
- [ ] **Win Validation**: E key press during other phases (`Dịch vụ ban ngày`, `Khóa lựa chọn`, `Resolve`, `Reset`) is ignored; no event generated.
- [ ] **Lose Detection**: Bộ đếm ward reaching 0 sends `OnWardTimerEmpty` event to Game Máy trạng thái.
- [ ] **Lose Độ ưu tiên**: If Bộ đếm ward = 0 and E key pressed simultaneously, lose triggers (whale devours player); win is ignored.
- [ ] **Shrine Proximity**: `is_near_shrine` returns true when `distance(player, shrine_center) <= shrine_trigger_radius`.
- [ ] **Shrine Glow**: Shrine glow VFX activates when player distance <= `shrine_glow_start_distance`.
- [ ] **Debounce**: Multiple E presses within `debounce_window_sec` window generate only one `OnShrineReached` event.
- [ ] **Phase Gating**: Win/lose checks only đang hoạt động during `Sinh tồn ban đêm`; idle during other phases.
- [ ] **Hiệu năng**: Win/lose check processing completes within 1ms average per frame on target PC.
- [ ] **Cross-System Events**: Verify `OnShrineReached` and `OnWardTimerEmpty` delivered reliably to Game Máy trạng thái.

## Open Questions

| Question | Owner | Deadline | Resolution |
|----------|-------|----------|------------|
| Nên shrine glow start distance be linked to `shrine_trigger_radius`? | UX-Designer | Before vertical slice lock | Open |
| Nên win trigger automatically on proximity (no E key)? | Game Designer | Before prototype test #1 | Resolved: E key required (player choice matters) |
| What happens if shrine zone fails to load (Map Director error)? | Systems Designer | Before night implementation | Open |
