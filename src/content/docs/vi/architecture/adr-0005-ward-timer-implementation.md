---
title: 'ADR-0005: Bộ đếm ward Triển khai'
description: 'Bản dịch tiếng Việt cho ADR-0005: Bộ đếm ward Triển khai.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Đã chấp nhận
> **Ngày**: 2026-05-07
> **Author**: opencode

## Bối cảnh

The Bộ đếm ward is the single lethal tài nguyên in Solar Phobia—counts down during Phase ban đêm, death when it reaches 0. Phải integrate with R3 reactive hệ thống and hỗ trợ sensory tier transitions.

## Quyết định

Use R3 `ReactiveProperty<float>` for Ward value with tier máy trạng thái:

```csharp
public class WardTimer : IInitializable, ITickable {
    private readonly ReactiveProperty<float> _currentWard = new(0f);
    public ReadOnlyReactiveProperty<float> CurrentWard => _currentWard;
    public ReadOnlyReactiveProperty<SensoryTier> CurrentTier { get; }
    
    private float _baseDrainRate = 1.0f;
    private float _drainMultiplier = 1.0f;
    
    public void Initialize(int ghostsSaved, int dayPenalties) {
        _currentWard.Value = 10f + (ghostsSaved * 30f) - dayPenalties;
    }
    
    public void Tick() {
        _currentWard.Value -= _baseDrainRate * _drainMultiplier * Time.deltaTime;
        if (_currentWard.Value <= 0) {
            _onDepleted.OnNext(Unit.Default);
        }
    }
}
```

## Hệ quả

- Positive: ReactiveProperty enables hệ thống to subscribe to Ward changes
- Positive: Single source of truth for all damage/penalty calculations
- Need: Ensure tier transitions are smooth, not jarring

## Yêu cầu GDD Addressed

- TR-ward-001: Ward initialization from day choices
- TR-ward-002: Passive drain with multiplier
- TR-ward-003: Sensory tier transitions

## Engine Compatibility

- Unity 6.3.11f1
- R3 (new reactive hệ thống, post-cutoff from LLM training)
- VContainer for DI