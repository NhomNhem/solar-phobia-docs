---
title: 'Story 001: Deterministic Seed — Chunk Generation + Run Reproducibility'
description: 'Bản dịch tiếng Việt cho Story 001: Deterministic Seed — Chunk Generation + Run Reproducibility.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: map-spawn-director
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Logic
> **Độ ưu tiên**: P0
> **Estimate**: 5 hours

## Bối cảnh

**GDD**: `design/gdd/map-and-spawn-director.md`
**TR-ID**: `TR-map-001`
**ADR**: ADR-0006: Map Generation Strategy — Trạng thái: Đã chấp nhận

**ADR Tóm tắt quyết định**: Seed stored in run snapshot. Chunks spawn ahead of player, despawn behind. Same seed always produces identical layout.

## Tiêu chí chấp nhận

- [x] Initialize(seed) sets xác định RNG trạng thái.
- [x] GenerateChunk(index) produces identical output for same seed + index.
- [x] Different seeds produce different layouts.
- [x] Seed is stored and retrievable for run snapshot/replay.
- [x] Chunk generation is pure math — no Unity scene trạng thái required.

## Ghi chú triển khai

- `MapSpawnDirector.Initialize(int seed)` → `_rng = new System.Random(seed)`
- `GenerateChunk(int index)` → `new System.Random(_seed + index)`
- Returns `ChunkData` struct (mound positions, type, hazard flags)
- No MonoBehaviour dependency — fully testable in Editor

## Test Evidence

**Story Loại**: Logic
**Required**: `Assets/_Project/Application/Editor/Tests/MapSeedTests.cs`

**Trạng thái**: [x] Hoàn tất — 16/16 tests passing

- `Assets/_Project/Application/Editor/Tests/MapSeedTests.cs` (16 tests, AC-1 through AC-5 + multi-chunk determinism)
