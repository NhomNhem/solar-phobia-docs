---
title: 'Story 005: Cover Density Validation — Spawn Pass Guard'
description: 'Bản dịch tiếng Việt cho Story 005: Cover Density Validation — Spawn Pass Guard.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: map-spawn-director
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Logic
> **Độ ưu tiên**: P1
> **Estimate**: 3 hours

## Bối cảnh

**GDD**: `design/gdd/map-and-spawn-director.md` — Cover Density Validation formula
**TR-ID**: `TR-map-006`
**ADR**: ADR-0006

**Formula**: `cover_density = mo_thuong_count / lane_length` (target: 0.02-0.08 per unit)

## Tiêu chí chấp nhận

- [x] CoverDensityValidator.IsValid(int moThuongCount, float laneLength) returns true in range.
- [x] Below minimum → IsValid returns false (caller regenerates).
- [x] MinCountForLane(laneLength) returns minimum required count.
- [x] DefaultMoThuongCount = 14.

## Test Evidence

**Story Loại**: Logic
**Required**: `Assets/_Project/Application/Editor/Tests/CoverDensityTests.cs`

**Trạng thái**: [x] Hoàn tất — 11/11 tests passing

- `Assets/_Project/Application/Editor/Tests/CoverDensityTests.cs` (11 tests)

