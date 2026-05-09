---
title: 'Story 001: Soul Entity — Canonical Data Model (Linh, Van, Minh)'
description: 'Bản dịch tiếng Việt cho Story 001: Soul Entity — Canonical Data Model (Linh, Van, Minh).'
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

- [x] 3 canonical souls initialized: linh (Em Linh), van (Ông Văn), minh (Anh Minh).
- [x] SoulId is immutable lookup key.
- [x] DaySelectionState: Unselected / Saved / Abandoned.
- [x] NightOutcomeState: None / Drag / Block / FakeShrine.
- [x] LifeState: Alive / Lost.

## Test Evidence

**Trạng thái**: [x] Hoàn tất — covered by SoulRepositoryTests.cs (16 tests)
