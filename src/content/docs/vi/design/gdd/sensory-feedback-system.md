---
title: 'Hệ thống phản hồi giác quan'
description: 'Bản dịch tiếng Việt cho Hệ thống phản hồi giác quan.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Approved
> **Author**: User + opencode
> **Last Updated**: 2026-05-07
> **Implements Pillar**: Consequence-driven survival loop with day/night emotional contrast

## Tổng quan

Hệ thống phản hồi giác quan provides diegetic, non-HUD information to the player about their survival trạng thái. Instead of watching a progress bar, the player feels danger approaching through progressive visual and audio degradation. The hệ thống maps Bộ đếm ward thresholds to sensory tiers that alter the player's perception without explicit numbers. Without this hệ thống, the player relies on HUD elements, breaking immersion and the "readable survival pressure" pillar.

## Player Fantasy

The player nên feel **unconscious awareness**—knowing they're in danger without seeing numbers. The degradation nên create **dread escalation**—each tier feels worse than the last, building to "Hopeless Hope" where the player knows death is coming but fights anyway.

## Detailed Design

### Lõi Rules

1. **Tier Mapping**: Bộ đếm ward percentage maps to 5 sensory tiers:
   - Tier 1 (>75%): Stable - no degradation
   - Tier 2 (≤75%): Creeping Dread - vignette appears
   - Tier 3 (≤50%): Heavy Burden - audio changes, dash cooldown
   - Tier 4 (≤25%): Panic - chromatic aberration, whispering
   - Tier 5 (≤10s): Death Spiral - tunnel vision, tinnitus

2. **Tier Transitions**: Smooth interpolation between tiers, not abrupt switches.
3. **Visual Degradation**: Vignette → Lowpass audio → Chromatic aberration → Tunnel vision (progressive)
4. **Audio Degradation**: Normal → Lowpass filter → Heavy breathing → Whispering → Tinnitus (progressive)
5. **Duration Cap**: Tier 4 (Panic) capped at 30 seconds max to prevent feedback loop.

### States and Transitions

| State | Entry Condition | Exit Condition | Behavior |
|-------|-----------------|----------------|----------|
| Tier1_Stable | Ward > 75% | Ward ≤ 75% | No effects |
| Tier2_CreepingDread | Ward ≤ 75% | Ward ≤ 50% | Vignette α=0.3, lowpass audio |
| Tier3_HeavyBurden | Ward ≤ 50% | Ward ≤ 25% | Breathing audio, dash +0.1s cooldown |
| Tier4_Panic | Ward ≤ 25% | Ward ≤ 10s or 30s cap | Chromatic aberration, whispers |
| Tier5_DeathSpiral | Ward ≤ 10s | Ward = 0 | Tunnel vision 80%, tinnitus |

### Interactions with Other Systems

- **Máu/thể lực & Luật sát thương -> Sensory Feedback**: Sends Ward value updates. System computes tier.
- **Bộ điều khiển người chơi <- Sensory Feedback**: Receives dash cooldown penalty during Tier 3.
- **Điều phối trạng thái âm thanh <- Sensory Feedback**: Receives tier changes for audio mix.
- **Chạy sinh tồn ban đêm -> Sensory Feedback**: Ward values during night phase.

## Formulas

### Tier Threshold Check
```
current_tier = 
  if ward_pct > 75: TIER_1
  elif ward_pct > 50: TIER_2
  elif ward_pct > 25: TIER_3
  elif ward_sec_remaining > 10: TIER_4
  else: TIER_5
```

### Vignette Alpha (Tier 2-4)
```
vignette_alpha = lerp(0, 0.6, (tier - 2) / 3)
```

### Audio Lowpass Frequency (Tier 2-5)
```
lowpass_freq = lerp(20000, 500, (tier - 2) / 3)
```

## Edge Cases

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| Ward jumps from 80% to 20% (boss strike) | Jump to Tier 4 immediately | Instant feedback for major event |
| Ward recovers (unlikely but possible) | Reverse tier progression | Symmetry in hệ thống |
| Multiple rapid tier changes | Queue transitions, smooth interpolation | Prevent visual jarring |
| Player in menu during tier change | Changes apply but player doesn't see | Continue trạng thái tracking |

## Dependencies

| System | Direction | Nature of Dependency |
|--------|-----------|---------------------|
| Máu/thể lực & Luật sát thương | This depends on it | **Hard**: Ward value source |
| Bộ điều khiển người chơi | This depends on it | **Soft**: dash cooldown modifier |
| Điều phối trạng thái âm thanh | This depends on it | **Hard**: audio tier changes |
| Chạy sinh tồn ban đêm | This depends on it | **Hard**: night phase is when đang hoạt động |

## Tuning Knobs

| Parameter | Current Value | Safe Range | Effect of Increase | Effect of Decrease |
|-----------|---------------|------------|-------------------|-------------------|
| `tier2_threshold_pct` | 75 | 70-80 | Earlier creeping dread | Later onset |
| `tier3_threshold_pct` | 50 | 45-55 | Earlier heavy burden | Later onset |
| `tier4_threshold_pct` | 25 | 20-30 | Earlier panic | Later onset |
| `tier5_threshold_sec` | 10 | 5-15 | Earlier death spiral | Later onset |
| `tier4_max_duration_sec` | 30 | 20-45 | Longer panic trạng thái | Shorter panic |
| `max_vignette_alpha` | 0.6 | 0.4-0.8 | Darker vignette | Lighter vignette |

## Visual/Audio Yêu cầu

| Tier | Visual | Audio |
|------|--------|-------|
| 1 (Stable) | Normal image | Normal ambient |
| 2 (Creeping) | Vignette α=0.3 | Lowpass filter |
| 3 (Heavy) | + breathing overlay | Heavy breathing sounds |
| 4 (Panic) | Chromatic aberration | Whispering voices |
| 5 (Death) | Tunnel vision 80% | Tinnitus squeal |

## UI Yêu cầu

None - this is HUD-less design. All feedback is diegetic.

## Tiêu chí chấp nhận

- [ ] Ward values correctly map to tiers
- [ ] Vignette appears at Tier 2
- [ ] Audio lowpass at Tier 2
- [ ] Dash cooldown +0.1s at Tier 3
- [ ] Chromatic aberration at Tier 4
- [ ] Tier 4 caps at 30 seconds max
- [ ] Tunnel vision + tinnitus at Tier 5

## Open Questions

| Question | Owner | Deadline | Resolution |
|----------|-------|----------|------------|
| Nên there be audio-only warning at very low Ward? | Audio Designer | Before implementation | Open