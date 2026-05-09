---
title: 'Story 002-v2: A/D Movement — 2D Rigidbody Night Traversal + Day Walk'
description: 'Bản dịch tiếng Việt cho Story 002-v2: A/D Movement — 2D Rigidbody Night Traversal + Day Walk.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Hoàn tất
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P0
> **Replaces**: story-002-wasd-di chuyển.md (3D WASD — archived)

## Bối cảnh

**GDD**: Master GDD V5.0 — Phase 2 (Day) + Phase 3 (Night)
**ADR**: ADR-0003-v2: Bộ điều khiển người chơi Pattern (2D)

phase ban ngày: A/D slow walk on X-axis only (Transform.position, no physics).
phase ban đêm: A/D sprint with Rigidbody2D horizontal velocity.

## Tiêu chí chấp nhận

- [x] Night: A/D keys drive horizontal velocity via Rigidbody2D.
- [x] Night: effective_speed = base_move_speed (default 5.0).
- [x] Night: Movement blocked when PlayerInputMode != NightMovement.
- [x] Day: A/D keys move player slowly on X-axis only (no Y di chuyển).
- [x] Day: base_day_speed is configurable (default 2.0, slower than night).
- [x] base_move_speed is a configurable tuning knob — not hardcoded.

## Ghi chú triển khai

- Night: Rigidbody2D.velocity = new Vector2(inputX * speed, rb.velocity.y)
- Day: transform.position += Vector3(inputX * daySpeed * deltaTime, 0, 0)
- Gravity handled by Rigidbody2D in phase ban đêm
- phase ban ngày: Rigidbody2D.simulated = false (disable physics during Day)

## Test Evidence

**Story Loại**: Logic
**Required**: unit tests in Editor/Tests/

**Trạng thái**: [x] Hoàn tất — 22/22 tests passing

- `Assets/_Project/Application/Editor/Tests/Movement2DTests.cs` (22 tests, AC-1 through AC-6 + bị tắt mode + deltaTime scaling)

