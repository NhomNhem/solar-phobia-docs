---
title: 'Lõi Mechanics Cross-Tham chiếu (GDD -> Triển khai)'
description: 'Bản dịch tiếng Việt cho Lõi Mechanics Cross-Tham chiếu (GDD -> Triển khai).'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

Ngày: 2026-05-10

## Systems mapped
- Máy trạng thái phase
  - GDD: `design/gdd/game-trạng thái-phase-trạng thái-machine.md`
  - Code: `Assets/_Project/Application/Services/PhaseStateMachine.cs`

- Player Máy trạng thái
  - GDD: `design/gdd/player-controller.md`
  - Code: `Assets/_Project/Application/Services/PlayerStateMachine.cs`

- Phase ban ngày Timeline
  - GDD: `design/gdd/day-service-and-lựa chọn.md`
  - Code: `Assets/_Project/Application/Services/DayPhaseTimelineService.cs`

- Phase ban ngày Mechanics
  - GDD: `design/gdd/day-service-and-lựa chọn.md`
  - Code: `Assets/_Project/Application/Services/DayPhaseMechanicsService.cs`

- Điều phối map và spawn
  - GDD: `design/gdd/map-and-spawn-director.md`
  - Code: `Assets/_Project/Application/Services/MapSpawnDirector.cs`

- Cover Detection
  - GDD: `design/gdd/shadow-spatial-management.md`
  - Code: `Assets/_Project/Application/Services/CoverDetector2D.cs`

- Karma Hazards
  - GDD: `design/gdd/curse-effect-module.md`
  - Code: `Assets/_Project/Application/Services/KarmaHazardService.cs`

- Bộ đếm ward
  - GDD: `design/gdd/night-survival-run.md`
  - Code: `Assets/_Project/Infrastructure/Services/WardTimerService.cs`

- Sensory Tiers
  - GDD: `design/gdd/sensory-feedback-hệ thống.md`
  - Code: `Assets/_Project/Infrastructure/Services/SensoryTierService.cs`

- Strike Warning Integration
  - GDD: `design/gdd/player-controller.md`
  - Code: `Assets/_Project/Application/Services/StrikeWarningController.cs`
  - Presentation: `Assets/_Project/Presentation/Player/PlayerController.cs`

- Phase-Gated Input
  - GDD: `design/gdd/player-controller.md`
  - Code: `Assets/_Project/Application/Services/PlayerInputHandler.cs`

## Test evidence coverage
- Application EditMode tests: 27 files under `Assets/_Project/Application/Editor/Tests`
- Additional test files under `_Project`: total 30 `*Tests.cs`

## Notes
- Triển khai is organized under `Assets/_Project` (Unity-first layout), not `src/`.
- Gate policy nên treat `Assets/_Project` as canonical runtime code location.
