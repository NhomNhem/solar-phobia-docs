---
title: 'ADR-0006: Map Generation Strategy'
description: 'Bản dịch tiếng Việt cho ADR-0006: Map Generation Strategy.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Đã chấp nhận
> **Ngày**: 2026-05-07
> **Author**: opencode

## Bối cảnh

Điều phối map và spawn phải generate xác định, reproducible night maps using seeded procedural generation.

## Quyết định

Use xác định seed-based chunk spawning:
- Seed stored in run snapshot for reproducibility
- Chunks spawn ahead of player, despawn behind
- Curse bias applied at generation time (hazard placement)

```csharp
public class MapSpawnDirector : IInitializable {
    private int _seed;
    private System.Random _rng;
    
    public void Initialize(int seed) {
        _seed = seed;
        _rng = new System.Random(seed);
    }
    
    public Chunk GenerateChunk(int index) {
        // Deterministic based on index + seed
        var chunkSeed = _seed + index;
        var chunkRng = new System.Random(chunkSeed);
        // Generate terrain, spawns, hazards
    }
}
```

## Hệ quả

- Positive: Reproducible runs from seed
- Positive: Curse bias affects hazard placement
- Need: Ensure route viability check passes

## Yêu cầu GDD Addressed

- TR-map-001: Procedural generation with seed
- TR-map-002: Curse-based hazard spawning

## Engine Compatibility

- Unity 6.3.11f1
- VContainer