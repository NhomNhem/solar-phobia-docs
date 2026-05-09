---
title: 'ADR-0009: Quản lý không gian bóng'
description: 'Bản dịch tiếng Việt cho ADR-0009: Quản lý không gian bóng.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Đã chấp nhận
> **Ngày**: 2026-05-07
> **Author**: opencode

## Bối cảnh

Quản lý không gian bóng controls the shrinking safe zone polygon during Phase ban ngày.

## Quyết định

Polygon-based shadow with shrink event:

```csharp
public class ShadowManager : IInitializable, ITickable {
    private Polygon2D _shadowPolygon;
    private float _shrinkRate;
    
    public void Tick() {
        if (PhaseStateMachine.CurrentPhase == PhaseState.dayService) {
            _shadowPolygon.Shrink(_shrinkRate * Time.deltaTime);
        }
    }
    
    public bool IsInShadow(Vector2 position) {
        return _shadowPolygon.Contains(position);
    }
}
```

## Hệ quả

- Positive: Precise polygon collision for souls
- Positive: Shrink rate controllable via config
- Need: Phải trigger crowd event as it shrinks

## Yêu cầu GDD Addressed

- TR-shadow-001: Polygon-based shadow
- TR-shadow-002: Shrink event to Physical Crowding