---
title: 'Story 003: Query API — GetSavedSouls, GetAbandonedSoul, IsSelectionValid'
description: 'Bản dịch tiếng Việt cho Story 003: Query API — GetSavedSouls, GetAbandonedSoul, IsSelectionValid.'
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

- [x] GetSavedSouls() returns correct list.
- [x] GetAbandonedSoul() returns correct list.
- [x] IsSelectionValid(2) returns true when 2 saved, 1 abandoned.
- [x] GetSoul(id) is O(1) Dictionary lookup.

## Test Evidence

**Trạng thái**: [x] Hoàn tất — covered by SoulRepositoryTests.cs (16 tests)
