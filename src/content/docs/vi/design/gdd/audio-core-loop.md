---
title: 'Audio Design — Lõi Loop (Player/Survival)'
description: 'Bản dịch tiếng Việt cho Audio Design — Lõi Loop (Player/Survival).'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Feature**: Lõi Loop — Player Movement, Survival Mechanics
> **Generated**: 2026-05-07
> **Trạng thái**: Audio Direction Hoàn tất

---

## 1. Sonic Identity

**Lõi Aesthetic**: Watercolour on paper — organic, textured, intimate. Audio nên feel like sound ON the page, not OF the world.

**Emotional Targets**:
- Day: Warm, measured, contemplative — like gentle waves on a quiet shore
- Night: Urgent, desperate, primal — like being hunted by something ancient

---

## 2. Audio Palette

### Ambient Layers

| Layer | Day | Night | Notes |
|-------|-----|-------|-------|
| **Base** | Ocean waves (gentle) | Ocean waves (urgent) | Always present — represents the sea |
| **Wind** | Light breeze | Strong gusts | Increases with danger |
| **Vocals** | Soft village ambient | Whispers/distant calls | Linh/Van/Minh presence |
| **Threat** | None | Low whale drone | Offshore presence |

### Music Direction

**Phase ban ngày**: 
- Sparse, spacious — single instrument (guitar or similar)
- Feels like memory, reflection
- No rhythm — just atmosphere

**Phase ban đêm**:
- Tension building — low pulse/drone
- Layers add in as danger increases
- Stingers on strike warnings
- Relief stinger on shrine arrival

---

## 3. SFX Specifications

### Player Movement

| Event | Sound Loại | Parameters | Trigger |
|-------|------------|------------|---------|
| Walk (Day) | Soft footsteps | Volume: -20dB, Pitch: ±5% | While moving in day |
| Walk (Night) | Quicker, harder | Volume: -15dB, Pitch: ±10% | While moving in night |
| Sprint | Heavy breathing + quick steps | Volume: -10dB, Breath: loop | Shift held |
| Enter Cover | Muffled transition | Crossfade: 500ms | Enter Mo Thuong |
| Exit Cover | Unmuffled transition | Crossfade: 300ms | Exit Mo Thuong |

### Phase Transitions

| Event | Sound Loại | Parameters | Trigger |
|-------|------------|------------|---------|
| Day → Night | Threat motif rises + wind intensifies | 2s transition | Phase change event |
| Night → Day | Tension drops + warm tone returns | 1.5s transition | Phase change event |

### Hazards

| Event | Sound Loại | Parameters | Trigger |
|-------|------------|------------|---------|
| Strike Warning | Rising crack + heartbeat | Độ ưu tiên: Critical | On telegraph |
| Strike Hit | Loud impact + distortion | Độ ưu tiên: Critical | On strike resolve |
| Bone Relic Pickup | Breath + crackle + chant layer | Độ ưu tiên: High | E-key on CursedMound |

### UI/Feedback

| Event | Sound Loại | Parameters | Trigger |
|-------|------------|------------|---------|
| Phase Icon Change | Soft click/tick | Độ ưu tiên: Low | Phase trạng thái change |
| Cover Enter | Soft whisper bed fades in | Độ ưu tiên: High | Enter valid cover |
| Cover Exit | Exterior sounds return | Độ ưu tiên: High | Exit cover |
| Death | Distorted hit + low drone | Độ ưu tiên: Medium | Ward = 0 |
| Shrine Arrival | Relief stinger + tension drop | Độ ưu tiên: Medium | E-key on EndShrine |

---

## 4. Audio Events Summary

### Độ ưu tiên: Critical (Phải Have)
- Strike Warning (rising crack + heartbeat)
- Strike Hit (impact + distortion)
- Day → Night transition motif

### Độ ưu tiên: High
- Sprint breathing
- Bone Relic pickup
- Cover enter/exit audio

### Độ ưu tiên: Medium
- Footsteps (day/night variants)
- Phase icon change click
- Death audio
- Shrine arrival stinger

### Độ ưu tiên: Low
- Ambient layer crossfades
- UI hover sounds

---

## 5. Technical Notes

**Memory Budget Estimate**: ~50-80MB for core loop audio
- Music: 20-30MB (adaptive stems)
- SFX: 15-25MB (compressed OGG)
- Ambient: 10-20MB (loops)

**Audio Middleware**: Use Unity Audio or FMOD (not specified in tech stack)

**Adaptive Music**: Layer-based hệ thống — add layers based on:
- Ward timer level (tension increases as timer drops)
- Proximity to boss sweep (threat rises during sweep)
- Cover trạng thái (quieter when in cover)

---

## 6. Open Questions

| Question | Owner | Notes |
|----------|-------|-------|
| Use Unity Audio or FMOD? | Technical | Depends on project setup |
| Voice acting for NPCs? | Narrative | Linh/Van/Minh — dialogue or just ambient? |
| Music composer? | Audio Director | Need to commission or license |

---

## 7. Related GDDs

- `player-controller.md` — Audio triggers listed
- `health-stamina-damage-rules.md` — Ward tier audio changes
- `boss-ca-ong-searchlight.md` — Boss audio specifics
- `map-and-spawn-director.md` — Environmental audio

---

*Audio design complete for Lõi Loop. Ready for sound designer to expand into detailed specifications.*