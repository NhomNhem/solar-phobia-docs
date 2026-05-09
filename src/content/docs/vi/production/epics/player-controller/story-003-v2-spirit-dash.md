---
title: 'Story 003-v2: Spirit Dash — Khăn Tang Burst + Ward Cost'
description: 'Bản dịch tiếng Việt cho Story 003-v2: Spirit Dash — Khăn Tang Burst + Ward Cost.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Hoàn tất
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P1
> **Replaces**: story-003-sprint.md (Sprint multiplier — archived)

## Bối cảnh

**GDD**: Master GDD V5.0 — Section 3.1 (Bộ Điều Khiển Kỹ Năng)
**ADR**: ADR-0003-v2

Spirit Dash: Shift key → horizontal burst, invincible frames, costs -5.0s Ward.
Replaces the sprint multiplier concept entirely.

## Tiêu chí chấp nhận

- [x] Shift key triggers Spirit Dash: horizontal burst di chuyển.
- [x] Spirit Dash costs -5.0s from Bộ đếm ward on activation.
- [x] OnWardCostIncurred(5.0f) event fires on each dash.
- [x] Dash only đang hoạt động during Sinh tồn ban đêm phase.
- [x] Dash has cooldown to prevent spam (configurable, default 0.5s).
- [x] Dash blocked when Ward <= 5.0s (not enough Ward to pay cost).

## Ghi chú triển khai

- DashController.TryDash(bool input, PlayerInputMode mode)
- Fires OnWardCostIncurred(5.0f) — Bộ đếm ward subscribes and deducts
- No stamina hệ thống — Bộ đếm ward IS the tài nguyên
- Dash direction: current horizontal input direction (or last facing if no input)

## Test Evidence

**Story Loại**: Logic
**Required**: unit tests in Editor/Tests/

**Trạng thái**: [x] Hoàn tất — 21/21 tests passing

- `Assets/_Project/Application/Editor/Tests/DashTests.cs` (21 tests, AC-1 through AC-6 + cooldown clamping)

