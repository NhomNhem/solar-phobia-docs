---
title: 'Story 002: WASD Base Movement — CharacterController Night Traversal'
description: 'Bản dịch tiếng Việt cho Story 002: WASD Base Movement — CharacterController Night Traversal.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Đã được thay thế-by**: story-002-v2-ad-di chuyển-2d.md
> **Reason**: Game is 2D side-scroller. WASD/3D di chuyển replaced by A/D + Rigidbody2D.
> **Trạng thái**: Đã được thay thế (see story-002-v2-ad-di chuyển-2d.md)
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P0
> **Estimate**: 6 hours
> **Manifest Phiên bản**: N/A

## Bối cảnh

**GDD**: `design/gdd/player-controller.md`
**TR-ID**: `TR-player-002`
**ADR Governing Triển khai**: ADR-0003: Bộ điều khiển người chơi Pattern
**ADR Tóm tắt quyết định**: CharacterController.Move() with WASD input vector, gravity applied per frame. `base_move_speed` is a configurable tuning knob (default 5.0, range 2.0–8.0).

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: HIGH

---

## Tiêu chí chấp nhận

- [x] WASD keys drive horizontal di chuyển relative to camera facing during `Sinh tồn ban đêm`.
- [x] `effective_speed = base_move_speed * 1.0` when not sprinting.
- [x] Gravity applied each frame: `moveVector.y = -9.81f * Time.deltaTime`.
- [x] Movement is ignored when `PlayerInputMode != NightMovement`.
- [x] `base_move_speed` is a configurable tuning knob — not hardcoded inline.

---

## Ghi chú triển khai

*Derived from ADR-0003 Triển khai Guidelines:*

- `CharacterController.Move(moveVector * speed * Time.deltaTime)`
- Input: `_inputActions.Player.Move.ReadValue<Vector2>()`
- `base_move_speed` default: 5.0, safe range 2.0–8.0 (per GDD Tuning Knobs)
- Processed in `Update()` only when `_currentMode == NightMovement`
- Movement vector: `new Vector3(moveInput.x, gravity, moveInput.y)`

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Sprint multiplier (Story 003)
- Cover detection (Story 004)
- Stuck detection / teleport fallback (polish story, not in this epic)

---

## QA Test Cases

- **AC-1**: WASD moves player at base speed
  - Given: Phase = Sinh tồn ban đêm, `base_move_speed = 5.0`
  - When: Player holds W for 1 second
  - Then: Player position changes by ~5 units forward

- **AC-2**: Movement blocked outside Sinh tồn ban đêm
  - Given: Phase = Dịch vụ ban ngày
  - When: Player holds WASD
  - Then: Player position unchanged

- **AC-3**: Gravity applied
  - Given: Player is airborne (above ground)
  - When: No jump input
  - Then: Player falls toward ground each frame

- **AC-4**: base_move_speed is configurable
  - Given: `base_move_speed` set to 3.0 via config
  - When: Player moves for 1 second
  - Then: Distance traveled ≈ 3.0 units (not 5.0)

---

## Test Evidence

**Story Loại**: Logic
**Required evidence**: `tests/unit/player-controller/wasd-movement_test.cs` — unit tests phải exist and pass

**Trạng thái**: [x] Hoàn tất — 19/19 tests passing

- `Assets/_Project/Application/Editor/Tests/WasdMovementTests.cs` (19 tests, AC-1 through AC-4 + edge cases)

---

## Dependencies

- Depends on: Story 001 (Phase-Gated Input) — phải be Hoàn tất
- Unlocks: Story 003 (Sprint), Story 004 (Cover Detection)

