---
title: 'Story 003: Strike Telegraph + Penalty — Ward Cost -30s + Cover Break'
description: 'Bản dịch tiếng Việt cho Story 003: Strike Telegraph + Penalty — Ward Cost -30s + Cover Break.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: map-spawn-director
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Logic
> **Độ ưu tiên**: P0
> **Estimate**: 5 hours

## Bối cảnh

**GDD**: `design/gdd/map-and-spawn-director.md` — Strike Penalty formula
**TR-ID**: `TR-map-004`
**ADR**: ADR-0006

**Formula**: `ward_after_hit = max(0, ward_before_hit - StrikeTimePenaltySec)`

## Tiêu chí chấp nhận

- [x] Strike telegraph fires OnStrikeWarning event to Bộ điều khiển người chơi.
- [x] Unresolved exposure after telegraph → OnWardCostIncurred fires.
- [x] OnWardCostIncurred emits Ward cost (default -30s).
- [x] Strike never fires inside shrine safe zone.
- [x] StrikeTimePenaltySec is configurable (default 30, range 5-60).
- [x] StrikeTelegraphSec is configurable (default 1.5s, range 0.8-2.5s).

## Ghi chú triển khai

- `StrikeController.Tick(bool isExposed, bool inSafeZone, float deltaTime)`
- Fires `OnStrikeWarning` when telegraph starts
- Fires `OnWardCostIncurred(StrikeTimePenaltySec)` when strike resolves
- Phase gate: only đang hoạt động during Sinh tồn ban đêm

## Test Evidence

**Story Loại**: Logic
**Required**: `Assets/_Project/Application/Editor/Tests/StrikeTests.cs`

**Trạng thái**: [x] Hoàn tất — 14/14 tests passing

- `Assets/_Project/Application/Editor/Tests/StrikeTests.cs` (14 tests)

