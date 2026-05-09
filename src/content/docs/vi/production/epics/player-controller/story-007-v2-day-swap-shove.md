---
title: 'Story 007-v2: Phase ban ngày Swap + Shove — X-Axis Soul Management'
description: 'Bản dịch tiếng Việt cho Story 007-v2: Phase ban ngày Swap + Shove — X-Axis Soul Management.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Hoàn tất
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P1

## Bối cảnh

**GDD**: Master GDD V5.0 — Section 2.1
**ADR**: ADR-0003-v2

phase ban ngày: Space=Swap (exchange positions with a soul), F=Shove (push soul out of shadow).
Both only đang hoạt động during Dịch vụ ban ngày phase.

## Tiêu chí chấp nhận

- [x] Space key fires OnSwap event during Dịch vụ ban ngày phase.
- [x] F key fires OnShove event during Dịch vụ ban ngày phase.
- [x] Both blocked when PlayerInputMode != DayUI.
- [x] Swap fires OnSwap event (soul targeting handled by Soul hệ thống).
- [x] Shove fires OnShove event (direction handled by Soul hệ thống).

## Test Evidence

**Story Loại**: Logic
**Required**: unit tests in Editor/Tests/

**Trạng thái**: [x] Hoàn tất — 12/12 tests passing

- `Assets/_Project/Application/Editor/Tests/DayActionTests.cs` (12 tests)

