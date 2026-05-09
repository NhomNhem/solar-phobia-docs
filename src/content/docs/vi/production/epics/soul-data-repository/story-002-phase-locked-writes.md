---
title: 'Story 002: Phase-Locked Writes — Selection + Night Outcome Validation'
description: 'Bản dịch tiếng Việt cho Story 002: Phase-Locked Writes — Selection + Night Outcome Validation.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: soul-data-repository
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Logic
> **Độ ưu tiên**: P0

## Bối cảnh

**ADR**: ADR-0002: Kho dữ liệu linh hồn Pattern — Trạng thái: Đã chấp nhận

## Tiêu chí chấp nhận

- [x] TrySetSelection rejected outside Dịch vụ ban ngày phase.
- [x] Cannot mark soul as both Saved and Abandoned.
- [x] TrySetNightOutcome only valid for Abandoned souls in Khóa lựa chọn/Sinh tồn ban đêm.
- [x] OnSelectionChanged fires on trạng thái change.
- [x] Reset() clears all run-scoped trạng thái.

## Test Evidence

**Trạng thái**: [x] Hoàn tất — covered by SoulRepositoryTests.cs (16 tests)
