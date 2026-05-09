---
title: 'ADR-0008: Chạy sinh tồn ban đêm Architecture'
description: 'Bản dịch tiếng Việt cho ADR-0008: Chạy sinh tồn ban đêm Architecture.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Đã chấp nhận
> **Ngày**: 2026-05-07
> **Author**: opencode

## Bối cảnh

Chạy sinh tồn ban đêm coordinates all night phase hệ thống: di chuyển, hazards, boss, shrine. Phase-gated container.

## Quyết định

Container hệ thống that enables/disables child hệ thống based on phase:

```csharp
public class NightSurvivalRun : IInitializable {
    private readonly PhaseStateMachine _phaseState;
    private readonly PlayerController _player;
    private readonly BossSearchlight _boss;
    private readonly CurseEffects _curses;
    private readonly ShrineObjective _shrine;
    private readonly WardTimer _ward;
    
    public void Initialize() {
        _phaseState.CurrentPhase
            .Where(p => p == PhaseState.NightSurvival)
            .Subscribe(_ => Enable());
    }
    
    private void Enable() {
        _player.Enable();
        _boss.Enable();
        _curses.Enable(_phaseState.GetPayload<CursePayload>());
    }
}
```

## Hệ quả

- Positive: Centralized phase entry/exit
- Positive: Clean enable/disable of subsystems
- Need: All dependencies phải be ready before Enable

## Yêu cầu GDD Addressed

- TR-night-001: Night loop máy trạng thái
- TR-night-002: Phase entry/exit coordination