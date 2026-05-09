---
title: 'Story 004: Route Viability Check — Fairness Guard'
description: 'Bản dịch tiếng Việt cho Story 004: Route Viability Check — Fairness Guard.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: map-spawn-director
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Logic
> **Độ ưu tiên**: P1
> **Estimate**: 3 hours

## Bối cảnh

**GDD**: `design/gdd/map-and-spawn-director.md` — Route Viability Check formula
**TR-ID**: `TR-map-005`
**ADR**: ADR-0006

**Formula**: `is_viable = ward_remaining > (distance / speed) + safety_buffer`

## Tiêu chí chấp nhận

- [x] IsRouteViable returns true when Ward > travel time + buffer.
- [x] IsRouteViable returns false when Ward insufficient.
- [x] SafetyBufferSec is configurable (default 12s, range 5-30).
- [x] Zero speed returns false (cannot move).

## Test Evidence

**Story Loại**: Logic
**Required**: `Assets/_Project/Application/Editor/Tests/RouteViabilityTests.cs`

**Trạng thái**: [x] Hoàn tất — 8/8 tests passing

- `Assets/_Project/Application/Editor/Tests/RouteViabilityTests.cs` (8 tests)

