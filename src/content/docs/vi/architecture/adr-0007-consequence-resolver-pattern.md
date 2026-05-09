---
title: 'ADR-0007: Bộ xử lý hậu quả Triển khai'
description: 'Bản dịch tiếng Việt cho ADR-0007: Bộ xử lý hậu quả Triển khai.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Đã chấp nhận
> **Ngày**: 2026-05-07
> **Author**: opencode

## Bối cảnh

Bộ xử lý hậu quả maps abandoned soul → curse type deterministically. Phải run after Day lựa chọn, before Night spawn.

## Quyết định

Deterministic lookup table, writes once:

```csharp
public class ConsequenceResolver {
    private static readonly Dictionary<string, CurseType> CurseMap = new() {
        { "Linh", CurseType.Drag },    // Water Trap
        { "Van", CurseType.Block },    // Blood Net
        { "Minh", CurseType.FakeShrine } // Illusion
    };
    
    private bool _hasResolved = false;
    
    public CursePayload Resolve(string abandonedSoulId) {
        if (_hasResolved) throw new InvalidOperationException("Already resolved");
        _hasResolved = true;
        
        var curseType = CurseMap.GetValueOrDefault(abandonedSoulId, CurseType.Drag);
        return new CursePayload { Type = curseType, Intensity = 1.0f };
    }
}
```

## Hệ quả

- Positive: Deterministic, no randomness
- Positive: One-write prevents double resolution
- Need: Payload phải reach Map Director before Night starts

## Yêu cầu GDD Addressed

- TR-consequence-001: Curse mapping from sacrifice
- TR-consequence-002: One-write rule enforcement