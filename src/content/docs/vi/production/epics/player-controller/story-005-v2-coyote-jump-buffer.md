---
title: 'Story 005-v2: Coyote Time + Jump Buffering — Platformer Feel'
description: 'Bản dịch tiếng Việt cho Story 005-v2: Coyote Time + Jump Buffering — Platformer Feel.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Hoàn tất
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P1

## Bối cảnh

**GDD**: Master GDD V5.0 — Section 3.1 (Yêu cầu)
**ADR**: ADR-0003-v2

Standard precision platformer feel requirements.

## Tiêu chí chấp nhận

- [x] Coyote Time: player can jump up to 0.1s after walking off a ledge.
- [x] Jump Buffering: jump input registered up to 0.15s before landing.
- [x] Both only đang hoạt động during Sinh tồn ban đêm phase.
- [x] Coyote Time and Jump Buffer durations are configurable tuning knobs.

## Test Evidence

**Story Loại**: Logic
**Required**: unit tests in Editor/Tests/

**Trạng thái**: [x] Hoàn tất — 17/17 tests passing

- `Assets/_Project/Application/Editor/Tests/PlatformerFeelTests.cs` (17 tests)

