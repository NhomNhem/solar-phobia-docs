---
title: 'Chuyển camera ngày/đêm'
description: 'Bản dịch tiếng Việt cho Chuyển camera ngày/đêm.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Approved
> **Author**: User + opencode
> **Last Updated**: 2026-05-07
> **Implements Pillar**: Consequence-driven survival loop with day/night emotional contrast

## Tổng quan

Chuyển camera ngày/đêm controls the visual perspective shift between the day and night phases, defining how the camera behaves during each phase and how it transitions between them. The day phase uses a fixed 2.5D top-down macro view (close-up on the market stall), while the night phase uses a side-scrolling camera that follows the player through the horizontal lane. The transition itself is abrupt and jarring—a deliberate design choice that reinforces the emotional contrast between calm deliberation and panic survival. Without this hệ thống, the vòng lặp ngày/đêm would feel visually continuous, breaking the "Opposites Attract" pillar that defines Solar Phobia's identity.

## Player Fantasy

The player nên feel **visual disorientation and emotional whiplash** when transitioning from day to night. The day camera is intimate and confined—a macro view of the market stall where every soul is visible and close. The night camera opens up dramatically, pulling back to reveal the vast, dark beach and the distant whale skeleton. This shift nên feel like being thrown from a cramped room into an open, threatening void. The fantasy is **"the world suddenly got bigger and more dangerous"**—the camera itself tells the player that night is fundamentally different from day.

The emotional promise: **"What was contained is now exposed."** The close day camera creates a false sense of safety; the pulled-back night camera shatters that illusion.

## Detailed Design

### Lõi Rules

1. **Phase ban ngày Camera**: Fixed 2.5D top-down view (Macro View), locked position centered on the market stall. No player-controlled camera di chuyển. Camera shows all 3 souls + player in frame with minimal visible background.
2. **Phase ban đêm Camera**: Side-scrolling follow camera, locked Y-axis (vertical lane only), smooth pan behind player. Camera maintains fixed distance from player on X-axis.
3. **Day → Night Transition**: Abrupt zoom-out (not smooth). Immediate color grade swap (warm to cold). Vignette spikes. Duration: 0.5s total.
4. **Night → Day Transition**: Abrupt zoom-in. Color grade swap back (cold to warm). Vignette resets. Duration: 0.3s.
5. **No Camera During Khóa lựa chọn**: Camera locked to Day position throughout Khóa lựa chọn phase.
6. **Resolve Camera**: On win (shrine reached): slow pan to shrine glow, camera settles. On lose (death): rapid darken, camera shake, fade to black.

### Camera Behavior by Phase

| Phase | Camera Mode | Player Control | Behavior |
|-------|-------------|----------------|----------|
| Dịch vụ ban ngày | Fixed Top-Down | None | Locked position, shows stall + 3 souls + player |
| Khóa lựa chọn | Fixed Top-Down | None | Same as Dịch vụ ban ngày, locked |
| Sinh tồn ban đêm | Side-Scrolling Follow | Mouse-look Y-axis only | Follows player X position, fixed Z distance |
| Resolve | Cinematic | None | Win: pan to shrine; Lose: shake + fade |
| Reset | Fade to black | None | Rapid fade, then reset to Day position |

### Transition Specifications

**Day → Night Transition** (triggers on Trạng thái game phase change to Sinh tồn ban đêm):
- Frame 0: Day camera position frozen
- Frame 1-5 (0.08s): Camera rapidly zooms out (2x distance increase)
- Frame 6-15 (0.17s): Color grade swaps (warm → cold)
- Frame 16-30 (0.25s): Vignette increases from 0 to α=0.6
- Total duration: 0.5s
- Audio: Threat motif swells, wind/wave layer increases

**Night → Day Transition** (triggers on Trạng thái game phase change to Dịch vụ ban ngày):
- Frame 0: Night camera position frozen
- Frame 1-10 (0.17s): Camera rapidly zooms in (0.5x distance)
- Frame 11-20 (0.17s): Color grade swaps (cold → warm)
- Total duration: 0.3s

### Mouse-Look (Night Only)

- Y-axis only (vertical rotation for looking up/down at searchlight)
- X-axis locked (camera follows player horizontally, does not rotate)
- Sensitivity: configurable `camera_sensitivity`
- No manual zoom controls (zoom is phase-dependent only)

## Formulas

### Camera Distance by Phase

```
day_camera_distance = 5.0 units (fixed)
night_camera_distance = 10.0 units (fixed)
transition_zoom_speed = (night_camera_distance - day_camera_distance) / transition_duration
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| `day_camera_distance` | float | 3-8 | config | Fixed distance for day top-down view |
| `night_camera_distance` | float | 8-15 | config | Fixed distance for night side-scroll |
| `transition_duration_day_to_night` | float | 0.3-1.0 | config | Day→Night transition time |
| `transition_duration_night_to_day` | float | 0.2-0.8 | config | Night→Day transition time |
| `vignette_max_alpha` | float | 0.3-0.8 | config | Maximum vignette during night |

**Expected output**: Camera positions, transition timing

### Player-relative Camera Follow (Night)

```
camera_x = player_x + camera_offset_x
camera_y = player_y + camera_offset_y (mouse-look modified)
camera_z = fixed_night_distance
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| `camera_offset_x` | float | -2 to 2 | config | Horizontal offset from player |
| `camera_offset_y` | float | 0-5 | runtime | Vertical offset (mouse-look) |
| `camera_follow_smooth` | float | 0.1-0.5 | config | Lerp smoothing factor |

**Expected output**: Camera world position

## Edge Cases

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| Player dies during transition animation | Hoàn tất transition, then play death sequence | Transition is phase change, not player action |
| Mouse-look at screen edge | Clamp Y rotation to ±30° from center | Prevents camera flipping |
| Resolution change during transition | Cancel transition, restart on new resolution | Prevents visual artifacts |
| Very low frame rate during transition | Hoàn tất transition in fixed frames, not time | Ensures transition always completes |

## Dependencies

| System | Direction | Nature |
|--------|-----------|--------|
| Trạng thái game / Máy trạng thái phase | Depends on this | Hard: receives phase change event (`OnDayStart`, `OnNightStart`, `OnChoiceLock`, `OnResolve`) to trigger camera transitions |
| Bộ điều khiển người chơi | This depends on it | Hard: reads player position for night follow camera |
| Điều phối map và spawn | This depends on it | Soft: may adjust camera distance based on lane width |

**Interface Ownership**:
- Chuyển camera ngày/đêm owns: camera position, rotation, transition timing, vignette, color grade
- Trạng thái game owns: phase change triggers
- Bộ điều khiển người chơi owns: player position data

## Tuning Knobs

| Parameter | Current | Safe Range | Effect of Increase | Effect of Decrease |
|-----------|---------|------------|---------------------|---------------------|
| `day_camera_distance` | 5.0 | 3-8 | More visible background, less intimacy | More intimate, less context |
| `night_camera_distance` | 10.0 | 8-15 | More visible lane, harder to see player | Better player visibility, less lane visible |
| `transition_duration_day_to_night` | 0.5s | 0.3-1.0 | Smoother but less jarring | More jarring, faster |
| `vignette_max_alpha` | 0.6 | 0.3-0.8 | Stronger claustrophobia at night | Weaker effect |
| `camera_sensitivity` | 1.0 | 0.5-2.0 | Faster look speed | Slower look speed |

## Tiêu chí chấp nhận

1. **Day Camera Fixed**: Camera remains completely static during Dịch vụ ban ngày and Khóa lựa chọn phases
2. **Night Camera Follows**: Camera smoothly follows player X position during Sinh tồn ban đêm
3. **Abrupt Transition**: Day→Night transition completes in exactly 0.5s with zoom-out, color swap, and vignette spike
4. **Mouse-Look Works**: Y-axis mouse-look functions during Sinh tồn ban đêm, X-axis remains locked
5. **Resolve Cinematics**: Win triggers slow pan to shrine; lose triggers shake + fade to black
6. **No Camera During Khóa lựa chọn**: Camera does not move or transition during Khóa lựa chọn phase
7. **Transition Triggers on Phase Change**: Camera transition fires immediately when Trạng thái game changes phases

---

*End of Chuyển camera ngày/đêm GDD.*