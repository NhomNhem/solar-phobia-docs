---
title: 'Story 006: IMapSpawnDirector Interface — Bộ điều khiển người chơi Signals'
description: 'Bản dịch tiếng Việt cho Story 006: IMapSpawnDirector Interface — Bộ điều khiển người chơi Signals.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: map-spawn-director
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Logic
> **Độ ưu tiên**: P0
> **Estimate**: 4 hours

## Bối cảnh

**GDD**: `design/gdd/map-and-spawn-director.md` — Bộ điều khiển người chơi interactions
**TR-ID**: `TR-map-007`
**ADR**: ADR-0006

This story unblocks player-controller story-007 (Strike Warning Integration).
IMapSpawnDirector exposes the event Bộ điều khiển người chơi subscribes to.

## Tiêu chí chấp nhận

- [x] IMapSpawnDirector.OnStrikeWarning observable exists and fires.
- [x] IMapSpawnDirector.UpdatePlayerPosition(Vector2, Bounds) method exists.
- [x] OnEnterCover / OnExitCover event fire when player overlaps cover triggers.
- [x] Interface is in Application layer — no Unity scene dependency.

## Ghi chú triển khai

- Define `IMapSpawnDirector` interface in Application/Services/Interfaces/
- Stub implementation `MapSpawnDirectorStub` for testing
- Bộ điều khiển người chơi story-007 subscribes to `OnStrikeWarning`

## Test Evidence

**Story Loại**: Logic
**Required**: `Assets/_Project/Application/Editor/Tests/MapSpawnDirectorInterfaceTests.cs`

**Trạng thái**: [x] Hoàn tất — 11/11 tests passing

- `Assets/_Project/Application/Editor/Tests/MapSpawnDirectorInterfaceTests.cs` (11 tests)

