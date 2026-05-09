---
title: 'Story 001: Phase-Gated Input — Day UI / Night Movement / Disabled'
description: 'Bản dịch tiếng Việt cho Story 001: Phase-Gated Input — Day UI / Night Movement / Disabled.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Hoàn tất
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P0
> **Estimate**: 8 hours
> **Manifest Phiên bản**: N/A

## Bối cảnh

**GDD**: `design/gdd/player-controller.md`
**TR-ID**: `TR-player-001`, `TR-player-008`
**ADR Governing Triển khai**: ADR-0003: Bộ điều khiển người chơi Pattern
**ADR Tóm tắt quyết định**: New Input System + CharacterController with khóa theo phase enable/disable via IPhaseStateMachine subscription. Switch `PlayerInputMode` enum (DayUI / NightMovement / Disabled) on phase change.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: HIGH (New Input System, post-cutoff API)

---

## Tiêu chí chấp nhận

- [x] During `Dịch vụ ban ngày`, WASD/mouse di chuyển is ignored; only UI clicks processed.
- [x] During `Sinh tồn ban đêm`, WASD/mouse-look works; UI clicks on NPCs ignored.
- [x] During `Khóa lựa chọn`, `Resolve`, `Reset`, all input ignored except skip/continue prompts.
- [x] No combat inputs (attack, block, counter) exist in any phase.
- [x] On `Sinh tồn ban đêm` exit, all di chuyển/interact inputs bị tắt cleanly — no orphaned trạng thái.

---

## Ghi chú triển khai

*Derived from ADR-0003 Triển khai Guidelines:*

- Subscribe to `IPhaseStateMachine.CurrentPhase` (R3 ReactiveProperty)
- Switch `PlayerInputMode` enum: `DayUI` / `NightMovement` / `Disabled`
- `PlayerInputActions` asset generated via New Input System
- Phase change phải be synchronous — no frame delay on mode switch
- `OnPhaseChanged(PhaseState)` handles `Sinh tồn ban đêm` → Enable(), all others → Disable()

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Actual di chuyển physics (Story 002)
- Sprint logic (Story 003)
- Cover detection (Story 004)
- E-key interactions (Story 005)
- Cursor visibility (Story 006)

---

## QA Test Cases

- **AC-1**: Dịch vụ ban ngày blocks WASD
  - Given: Phase = Dịch vụ ban ngày
  - When: Player presses WASD
  - Then: No di chuyển occurs; `PlayerInputMode == DayUI`

- **AC-2**: Sinh tồn ban đêm enables di chuyển
  - Given: Phase = Sinh tồn ban đêm
  - When: Player presses WASD
  - Then: Movement input is processed; `PlayerInputMode == NightMovement`

- **AC-3**: Khóa lựa chọn disables all input
  - Given: Phase = Khóa lựa chọn
  - When: Player presses any input
  - Then: No action occurs; `PlayerInputMode == Disabled`

- **AC-4**: Clean exit from Sinh tồn ban đêm
  - Given: Phase transitions from Sinh tồn ban đêm to EndingEvaluation
  - When: Transition fires
  - Then: `PlayerInputMode == Disabled`; no sprint/interact trạng thái persists

- **AC-5**: No combat inputs exist
  - Given: Any phase
  - When: Inspecting PlayerInputActions asset
  - Then: No attack, block, or counter action bindings present

---

## Test Evidence

**Story Loại**: Logic
**Required evidence**: `tests/unit/player-controller/khóa theo phase-input_test.cs` — unit tests phải exist and pass

**Trạng thái**: [x] Hoàn tất — 17/17 tests passing

- `Assets/_Project/Application/Editor/Tests/PhaseGatedInputTests.cs` (17 tests, all AC-1 through AC-5 + mode transitions)

---

## Dependencies

- Depends on: phase-trạng thái-machine epic (Hoàn tất ✅)
- Unlocks: All other player-controller stories
