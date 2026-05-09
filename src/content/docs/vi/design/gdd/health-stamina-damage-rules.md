---
title: 'Máu/thể lực & Luật sát thương'
description: 'Bản dịch tiếng Việt cho Máu/thể lực & Luật sát thương.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Approved
> **Author**: User + opencode
> **Last Updated**: 2026-05-07
> **Implements Pillar**: Consequence-driven survival loop with day/night emotional contrast

## Tổng quan

Máu/thể lực & Luật sát thương defines the unified survival tài nguyên hệ thống that merges traditional "health" and "stamina" into a single mechanic called **Spirit Ward** (Nước Mắm Cốt). This hệ thống tracks the player's humanity and survival time during the night phase, acting as both the timer and the health bar. Every action—sprinting, dashing, getting hit by hazards—consumes Ward time. When Ward reaches zero, the whale devours the player. This hệ thống exists because Solar Phobia needs a single, understandable tài nguyên that creates tension: every second counts, and every choice has a time cost.

## Player Fantasy

The player nên feel **time pressure and vulnerability**—their Ward timer is always counting down, and there's never enough time to be safe. The fantasy is "running out of life"—each action phải be weighed against survival time. When Ward drops to critical levels (≤25%), the screen nên feel terrifying: chromatic aberration, audio distortion, and the sense that death is imminent. The emotional promise is "every moment matters"—the player never feels safe because the timer is always ticking.

## Detailed Design

### Lõi Rules

1. **Unified Resource**: All health and stamina functions merge into Spirit Ward (Bộ đếm ward).
2. **Initialization**: At night start, Ward is computed from day choices: `Initial_Ward_Sec = Base_Ward_Sec + (Ghosts_Saved * Ward_Per_Ghost_Sec) - Day_Penalties_Sec`.
3. **Action Costs**: Each player action consumes Ward time directly.
4. **Time Drain**: Ward constantly drains during night at rate modified by Bone Relic pickups.
5. **Hazard Damage**: Traps and searchlight strikes apply instant Ward penalties.
6. **Death Condition**: Ward = 0 triggers lose trạng thái.

### Ward Initialization

| Parameter | Value | Source | Description |
|-----------|-------|--------|-------------|
| `Base_Ward_Sec` | 10 | Trạng thái game contract | Minimum survival time (intentionally short) |
| `Ward_Per_Ghost_Sec` | 30 | config | Bonus time per saved soul |
| `Day_Penalties_Sec` | 0-30 | Day Service | Penalties from failed minigames |
| Max Initial Ward | 70 | computed | 10 + (2 × 30) = 70s with 2 souls saved |

### Action Costs

| Action | Ward Cost | Notes |
|--------|-----------|-------|
| Sprint (Shift held) | -0.5s/sec | Continuous while held, in addition to base drain |
| Jump / Double Jump | 0 | Free di chuyển |
| Swing (cloth throw) | -2.0s | One-time burst |
| Spirit Dash | -5.0s | Burst di chuyển |
| Glide | -1.0s/sec | Continuous while airborne |

### Ward Drain Rate

```csharp
float effective_ward_drain = base_drain_rate * (1 + (bones_carried * hallucination_multiplier));
```

| Parameter | Default | Range | Owner |
|-----------|---------|-------|-------|
| `base_drain_rate` | 1.0/s | 0.1-5.0 | Điều phối map và spawn |
| `hallucination_multiplier` | 1.0 | 1.0-3.0 | Điều phối map và spawn |
| `bones_carried` | 0-3 | runtime | Player trạng thái |

### Hazard Penalties

| Hazard | Ward Penalty | Source |
|--------|--------------|--------|
| Nước Dâng (Water Trap) | -3.0s/sec | Bộ xử lý hậu quả |
| Lưới Máu (Blood Net) | -5.0s instant + slow | Bộ xử lý hậu quả |
| Ảo Ảnh (Illusion) | -15.0s instant | Bộ xử lý hậu quả |
| Searchlight Strike | -30.0s (capped) | Điều phối map và spawn (`StrikeTimePenaltySec`) |

**Strike Damage Cap**: To prevent unbounded difficulty spikes (e.g., 60+ seconds lost from strike + sprint + Bone Relic drain), the maximum Ward loss per strike is capped at `min(StrikeTimePenaltySec, Initial_Ward_Sec * 0.3)`. For example, with 70s initial Ward, max strike penalty is 21s (30%), not 30s.

**Strike Warning Độ ưu tiên**: The strike warning icon (from Điều phối map và spawn) MUST have visual z-order priority above all Tier 4 (Panic) effects (chromatic aberration). This ensures players can see the warning even at critical Ward levels. Alternative: use audio cue (distinct strike alarm sound) as fallback when visual is obscured.

### Readability Thresholds

| Ward Percent | Tier | Visual/Audio Effects | Max Duration |
|--------------|------|---------------------|---------------|
| >75% | Tier 1: Stable | Normal | None |
| ≤75% | Tier 2: Creeping Dread | Vignette (α 0.3), low-pass audio | None |
| ≤50% | Tier 3: Heavy Burden | Heavy breathing, dash cooldown +0.1s | None |
| ≤25% | Tier 4: Panic | Chromatic aberration, whispering audio | 30 sec cap |
| ≤10s | Tier 5: Death Spiral | Tinnitus SFX, tunnel vision | None |

**Tier 4 Duration Cap**: To prevent feedback loop (low Ward → panic → sprint → faster drain → more panic), Tier 4 effects have a maximum duration of 30 seconds. After 30 seconds at ≤25% Ward, Tier 4 effects fade to Tier 3 intensity even if Ward remains ≤25%.

## Formulas

### Initialization Formula

```
Initial_Ward_Sec = Base_Ward_Sec + (Ghosts_Saved * Ward_Per_Ghost_Sec) - Day_Penalties_Sec
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| `Base_Ward_Sec` | float | 10 | config | Minimum survival time |
| `Ghosts_Saved` | int | 0-2 | NPC Model | Number of souls saved |
| `Ward_Per_Ghost_Sec` | float | 30 | config | Bonus per saved soul |
| `Day_Penalties_Sec` | float | 0-30 | Day Service | Accumulated penalties |

**Expected output range**: 0-70 seconds

### Effective Drain Rate

```
effective_ward_drain = base_drain_rate * (1 + (bones_carried * hallucination_multiplier))
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| `base_drain_rate` | float | 0.1-5.0 | Map Director config | Base time loss per second |
| `bones_carried` | int | 0-3 | runtime | Whale bones collected |
| `hallucination_multiplier` | float | 1.0-3.0 | Map Director config | Multiplier per bone |

**Expected output range**: 0.1-20.0 units/second

### Ward Percentage

```
Ward_Percent = (Current_Ward / Max_Initial_Ward) * 100
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| `Current_Ward` | float | 0-Max | runtime | Current Ward value |
| `Max_Initial_Ward` | float | 70 | config | Maximum possible initial Ward |

**Expected output range**: 0-100%

## Edge Cases

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| Ward goes negative | Clamp to 0, trigger death | No negative time allowed |
| All souls abandoned (0 saved) | Base_Ward_Sec = 10s, no bonus | Minimum challenge |
| Strike during drift-dash | Apply full penalty | No invulnerability frames |
| Multiple traps hit same frame | Sum all penalties | Cumulative consequence |
| Ward at 5s, picks up bone | Drain jumps from 1x to 2x | Instant tension spike |

## Dependencies

| System | Direction | Nature |
|--------|-----------|--------|
| Trạng thái game / Máy trạng thái phase | Depends on this | Hard: manages Ward lifecycle, triggers death |
| Điều phối map và spawn | This depends on it | Hard: provides drain rates, strike penalty |
| Mô hình dữ liệu NPC/linh hồn | Soft | Provides Ghosts_Saved count |
| Day Service & Selection | Soft | Provides Day_Penalties_Sec |

**Interface Ownership**:
- Điều phối map và spawn owns: `base_drain_rate`, `hallucination_multiplier`, `StrikeTimePenaltySec`
- Máu/thể lực references but does not own these values

## Tuning Knobs

| Parameter | Current | Safe Range | Effect of Increase | Effect of Decrease |
|-----------|---------|------------|---------------------|---------------------|
| `Base_Ward_Sec` | 10s | 5-30s | Harder base survival | Easier base survival |
| `Ward_Per_Ghost_Sec` | 30s | 15-60s | More reward for saving | Less incentive to save |
| `base_drain_rate` | 1.0/s | 0.1-5.0 | Faster time pressure | Slower time pressure |
| `StrikeTimePenaltySec` | 30s | 5-60s | Harsh punishment | Forgiving punishment |
| `hallucination_multiplier` | 1.0 | 1.0-3.0 | More bone risk | Less bone risk |

## Tiêu chí chấp nhận

1. **Initialization**: Ward starts at correct value based on day choices (10-70s range)
2. **Action Costs**: Each action subtracts exact Ward amount specified
3. **Time Drain**: Drain rate correctly scales with bones carried
4. **Hazard Damage**: Each trap applies correct penalty
5. **Death Trigger**: Ward = 0 triggers lose event to Trạng thái game
6. **Visual Feedback**: Each threshold (75%, 50%, 25%, 10s) triggers correct VFX
7. **Formula Accuracy**: All computed values match specification exactly
8. **Phase Lock**: Ward only depletes during Sinh tồn ban đêm phase

---

*End of Máu/thể lực & Luật sát thương GDD.*