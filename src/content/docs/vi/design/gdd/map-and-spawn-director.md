---
title: 'Điều phối map và spawn'
description: 'Bản dịch tiếng Việt cho Điều phối map và spawn.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Approved
> **Author**: User + Copilot
> **Last Updated**: 2026-05-06
> **Implements Pillar**: Psychological consequence through readable survival pressure

## Tổng quan

Điều phối map và spawn controls night-phase spatial pressure in the Act 1 vertical slice. It owns route layout, fog-limited visibility, grave mound placement, shrine endpoints, and boss searchlight strike targeting windows. The player experiences this as a desperate traversal from Am Tho Bai Thuyen to the next safe shrine through a beach lane where cover, cursed pickups, and scanning threat phải be read in real time.

## Player Fantasy

The player nên feel hunted, exposed, and morally cornered. The map is not an arena to dominate; it is a haunted corridor where every detour for Bone Relics (`Ngoc Cot`) trades safety for guilt and time loss.

## Detailed Design

### Lõi Rules

**Pre-Night Validation Order**: The following sequence MUST occur before transitioning to Sinh tồn ban đêm:
   a. Map Director validates spawn bundle (route viability, cover placement, hazard zones)
   b. If spawn kiểm tra hợp lệ FAILS, return error to Game Máy trạng thái → transition to Lỗi nghiêm trọng
   c. Only AFTER spawn kiểm tra hợp lệ passes does Bộ xử lý hậu quả write NightOutcomeState
   d. This prevents locked NPC Model trạng thái with invalid night setup

1. Night map is a single horizontal lane between `StartShrine` and `EndShrine`.
2. Global fog limits forward visibility; reveal radius is player-centered.
3. Grave mounds are the primary tactical objects:
   - `SafeMound` (`MoThuong`): reliable cover.
   - `CursedMound` (`MoOan`): cover + Bone Relic pickup trigger.
   - `FalseSafeMound`: conditional trap cover spawned by consequence rules.
4. Boss remains in offshore background and projects periodic horizontal searchlight sweeps.
5. If player is exposed when sweep confirms line-of-sight, strike telegraph starts; unresolved exposure causes hit.
6. Cover validity yêu cầu player collider fully inside mound cover volume.
7. Bone Relic pickup from CursedMound applies hallucination package and Time Drain multiplier to Bộ đếm ward.
8. Spawn set phải always include at least one valid route from start to end with optional risk detours.
9. Map resets deterministically per seed on new run.
10. **Unified Resource Rule**: Phase ban đêm has no separate HP; all lethal pressure is represented through Bộ đếm ward depletion.
11. Strike hit applies timer loss and terrain disruption: default `StrikeTimePenaltySec = 30` and nearest đang hoạt động Mound is destroyed, creating debris that becomes a NEW cover volume for subsequent sweeps.
12. FalseSafeMound phải present a readable warning tell before failure (`TellDurationSec`), never instant-kill by surprise.

### States and Transitions

| State | Entry Condition | Exit Condition | Behavior |
|-------|-----------------|----------------|----------|
| NightMapInit | phase ban đêm starts | Spawn kiểm tra hợp lệ passes | Build lane, place objects, set fog |
| PatrolSweep | Init complete | Sweep interval elapsed | Boss searchlight scans lane |
| StrikeTelegraph | Player exposed during sweep | Telegraph timer ends | Warn target zone |
| StrikeResolve | Telegraph complete | Strike processed | Apply timer penalty, knockback, and cover break if still exposed |
| ShrineSafe | Player enters miếu kết thúc | Night resolve | Disable threats, hand off to resolve |

### Interactions with Other Systems

- **Trạng thái game / Máy trạng thái phase -> Map Director**: start/stop event vòng đời, phase lock.
- **Mô hình dữ liệu NPC/linh hồn -> Map Director**: abandoned soul + consequence intensity to bias Mo Oan and disruption placement.
- **Boss Chase AI <-> Map Director**: sweep pattern ownership split (Map owns lane geometry; Boss AI owns timing profile).
- **Solar Residue Hazard <-> Map Director**: hazard zones bound to lane segments and visibility constraints.
- **Máu/thể lực & Luật sát thương <-> Map Director**: map emits strike/relic/time-drain event; survivability rules return viability constraints and penalty caps.
- **Resource Effects <- Map Director**: Bone Relic pickup event trigger Time Drain modifier.
- **Bộ điều khiển người chơi <- Map Director**: receives cover zone and strike warning overlap event.
- **Bộ xử lý hậu quả -> Map Director**: can flag FalseSafeMound spawns (e.g., Linh-abandoned route profile).

## Formulas

### Sweep Exposure Check

```
is_exposed = in_sweep_cone AND (not in_valid_cover)
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| in_sweep_cone | bool | {0,1} | runtime geometry | Player intersecting đang hoạt động sweep band |
| in_valid_cover | bool | {0,1} | cover hệ thống | True only when fully covered |

**Expected output range**: boolean  
**Edge case**: if cover collider missing, treat as `in_valid_cover = 0`.

### Time Drain Under Bone Relic

```
effective_ward_drain = base_drain_rate * (1 + (bones_carried * hallucination_multiplier))
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| base_drain_rate | float/sec | 0.1-5.0 | config | Default protection decay |
| bones_carried | int | 0-3 | runtime inventory | Bone Relics carried in current run |
| hallucination_multiplier | float | 1.0-3.0 | config | Extra decay per bone relic (1 bone = 2×, 2 bones = 3×) |

**Expected output range**: 0.1-20.0/sec  
**Edge case**: clamp to project max safe drain cap.

### Strike Penalty

```
ward_time_after_hit = max(0, ward_time_before_hit - strike_time_penalty_sec)
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| ward_time_before_hit | float sec | 0-600 | runtime | Current Bộ đếm ward before impact |
| strike_time_penalty_sec | float sec | 5-60 | config | Timer chunk removed by strike hit |

**Expected output range**: 0-600 sec  
**Edge case**: if result is 0, trigger immediate fail resolution.

### Route Viability Check (Fairness Guard)

```
is_route_viable = ward_time_remaining > (distance_to_goal / effective_move_speed) + safety_buffer_sec
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| ward_time_remaining | float sec | 0-600 | runtime | Current timer |
| distance_to_goal | float | >0 | runtime | Remaining route distance |
| effective_move_speed | float | >0 | runtime | Speed after đang hoạt động penalties |
| safety_buffer_sec | float sec | 5-30 | config | Fairness margin for normal play |

**Expected output range**: boolean  
**Edge case**: if false immediately after first relic pickup, reduce đang hoạt động TimeDrain one tier for this run segment.

### Cover Density Validation

```
cover_density = mo_thuong_count / lane_length
```

| Variable | Loại | Range | Source | Description |
|----------|------|-------|--------|-------------|
| mo_thuong_count | int | 0-50 | spawn pass | Number of regular cover mounds |
| lane_length | float | >0 | map data | Traversable night lane length |

**Expected output range**: design target 0.02-0.08 per unit length  
**Edge case**: if below minimum threshold, regenerate placement once.

## Edge Cases

| Scenario | Expected Behavior | Rationale |
|----------|-------------------|-----------|
| No valid cover spawned in opening segment | Force-spawn one SafeMound near start | Prevent unavoidable opening hit |
| CursedMound blocks only route to shrine | Regenerate as side detour or convert to SafeMound | Keep risk optional, not mandatory |
| Sweep and strike telegraph overlap shrine safe zone | Suppress strike in safe zone | Preserve rule clarity |
| Player picks Bone Relic during đang hoạt động strike telegraph | Apply Time Drain immediately, do not cancel strike | Consistent risk timing |
| Fog occludes mandatory telegraph VFX | Boost local telegraph contrast in fog | Ensure fair readability |
| Seed generates dead-end route | Fail kiểm tra hợp lệ and rebuild layout | Guarantee completion path |
| Player hides behind FalseSafeMound | Mound emits warning tell (audio crack + visual fissure) for `TellDurationSec`, then collapses; player can still dodge | Keeps fear fair/readable |

## Dependencies

| System | Direction | Nature of Dependency |
|--------|-----------|---------------------|
| Trạng thái game / Máy trạng thái phase | This depends on it | **Hard**: lifecycle and phase authority |
| Mô hình dữ liệu NPC/linh hồn | This depends on it | **Hard**: consequence-informed spawn bias |
| Boss Chase AI | Bidirectional | **Hard**: synchronized sweep/strike behavior |
| Solar Residue Hazard | Bidirectional | **Hard**: hazard placement contract |
| Máu/thể lực & Luật sát thương | Bidirectional | **Hard**: strike/relic penalties consume ward timer; map generation respects viability/fairness constraints |
| Resource Effects | This hệ thống feeds it | **Soft**: emits Bone Relic pickup + Time Drain event |
| Bộ điều khiển người chơi | This hệ thống feeds it | **Hard**: cover/strike overlap signals |

## Interface Ownership

- **Điều phối map và spawn owns**: `base_drain_rate` (default protection decay, configurable 0.1-5.0), `hallucination_multiplier` (extra decay per bone relic, configurable 1.0-3.0), `StrikeTimePenaltySec` (timer penalty per strike, default 30s, range 5-60).
- **Máu/thể lực & Luật sát thương** references these values but does not own them.
- **Trạng thái game / Máy trạng thái phase** references `StrikeTimePenaltySec` but does not own it.

---

## Tuning Knobs

| Parameter | Current Value | Safe Range | Effect of Increase | Effect of Decrease |
|-----------|---------------|------------|-------------------|-------------------|
| FogDensity | 0.7 | 0.3-0.9 | More uncertainty/tension | More readability/less dread |
| SweepIntervalSec | 6.0 | 3.0-10.0 | Less frequent pressure | More relentless pressure |
| SweepWidth | 5.0 | 2.0-8.0 | Harder to avoid without cover | Easier traversal |
| StrikeTelegraphSec | 1.5 | 0.8-2.5 | Fairer reaction window | More punishing checks |
| MoThuongCount | 14 | 8-24 | Safer route options | Higher route risk |
| MoOanCount | 3 | 1-6 | More reward temptations | Fewer risk/reward moments |
| TimeDrainMultiplier | 0.5 | 0.1-1.0 | Harsher Bone Relic burden | Softer penalty |
| StrikeTimePenaltySec | 30 | 5-60 | Punishes exposure heavily | Softer punishment |
| TellDurationSec | 0.9 | 0.4-1.5 | Fairer reaction window on false cover | More surprise/less fairness |
| SafetyBufferSec | 12 | 5-30 | More survivability margin | Tighter viability |

## Visual/Audio Yêu cầu

| Event | Visual Feedback | Audio Feedback | Độ ưu tiên |
|-------|-----------------|----------------|----------|
| Sweep starts | Green lateral beam from offshore | Distant bass pulse | Critical |
| Strike telegraph | Ground warning shimmer + bone shadow | Rising crack sound | Critical |
| CursedMound proximity | Faint moss-green glow + clay head turn | Whisper bed | High |
| Bone Relic pickup | Vignette tighten + grain surge | Breath/crack/chant layer | Critical |
| FalseSafeMound pre-collapse tell | Fast fissure glow + dust shake | Bone crack crescendo | Critical |

## UI Yêu cầu

| Information | Display Location | Update Frequency | Condition |
|-------------|------------------|------------------|-----------|
| Protection timer trạng thái | Top HUD | Real-time | phase ban đêm |
| Time Drain đang hoạt động indicator | Timer widget status | On pickup/drop | Carrying Bone Relic |
| Shrine direction cue | Edge marker | Real-time | phase ban đêm |
| Strike warning icon | Near player reticle | On telegraph | Exposure risk |
| Strike penalty popup (-Xs) | Near timer widget | On hit | Strike resolved |
| False cover warning icon | Above mound silhouette | During tell window | Player near FalseSafeMound |

## Tiêu chí chấp nhận

- [ ] Start-to-miếu kết thúc route always exists in generated lane.
- [ ] Sweep exposure correctly ignores players fully inside valid cover.
- [ ] Strike never applies timer penalty inside shrine safe zone.
- [ ] CursedMound pickup always applies hallucination package and Time Drain.
- [ ] At least one optional Bone Relic detour exists in baseline slice seed.
- [ ] Night traversal remains readable under target fog settings without jump-scare reliance.
- [ ] FalseSafeMound always provides warning tell before collapse.
- [ ] First Bone Relic pickup is not auto-fail under baseline route viability check.

## Open Questions

| Question | Owner | Deadline | Resolution |
|----------|-------|----------|------------|
| Nên Mo Oan placement follow fixed authored points or weighted procedural sets? | Level Designer | Before second playtest wave | Open |
| Nên sweep pattern have one fake-out cycle for tension variation? | Game Designer | Before boss polish pass | Open |
| Nên Bone Relics be droppable mid-run to remove Time Drain? | Systems Designer | Before economy/hệ thống lock | Open |
