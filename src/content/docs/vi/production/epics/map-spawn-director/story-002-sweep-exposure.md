---
title: 'Story 002: Sweep Exposure Check — isexposed = incone AND not incover'
description: 'Bản dịch tiếng Việt cho Story 002: Sweep Exposure Check — isexposed = incone AND not incover.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: map-spawn-director
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Logic
> **Độ ưu tiên**: P0
> **Estimate**: 4 hours

## Bối cảnh

**GDD**: `design/gdd/map-and-spawn-director.md` — Sweep Exposure Check formula
**TR-ID**: `TR-map-003`
**ADR**: ADR-0006

**Formula**: `is_exposed = in_sweep_cone AND (not in_valid_cover)`

## Tiêu chí chấp nhận

- [x] Player in sweep cone + not in cover → is_exposed = true.
- [x] Player in sweep cone + fully in cover → is_exposed = false.
- [x] Player outside sweep cone → is_exposed = false regardless of cover.
- [x] Missing cover collider treated as not in cover (exposed).
- [x] Sweep never applies inside shrine safe zone.

## Ghi chú triển khai

- `SweepExposureCalculator.IsExposed(bool inCone, bool inValidCover)`
- Pure boolean logic — no Unity physics required
- Shrine safe zone: separate flag passed in

## Test Evidence

**Story Loại**: Logic
**Required**: `Assets/_Project/Application/Editor/Tests/SweepExposureTests.cs`

**Trạng thái**: [x] Hoàn tất — 7/7 tests passing

- `Assets/_Project/Application/Editor/Tests/SweepExposureTests.cs` (7 tests)

