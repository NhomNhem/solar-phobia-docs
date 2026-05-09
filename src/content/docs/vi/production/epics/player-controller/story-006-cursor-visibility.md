---
title: 'Story 006: Cursor Visibility — Phase-Driven Show/Hide'
description: 'Bản dịch tiếng Việt cho Story 006: Cursor Visibility — Phase-Driven Show/Hide.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Hoàn tất
> **Layer**: Lõi
> **Loại**: UI
> **Độ ưu tiên**: P1
> **Estimate**: 2 hours
> **Manifest Phiên bản**: N/A

## Bối cảnh

**GDD**: `design/gdd/player-controller.md`
**TR-ID**: `TR-player-007`
**ADR Governing Triển khai**: ADR-0003: Bộ điều khiển người chơi Pattern
**ADR Tóm tắt quyết định**: Cursor visible in Dịch vụ ban ngày (UI mode), hidden and locked in Sinh tồn ban đêm (mouselook mode). Handled synchronously in `OnPhaseChanged()`.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: LOW

---

## Tiêu chí chấp nhận

- [x] On `Dịch vụ ban ngày` entry: `Cursor.visible = true`, `Cursor.lockState = CursorLockMode.None`.
- [x] On `Sinh tồn ban đêm` entry: `Cursor.visible = false`, `Cursor.lockState = CursorLockMode.Locked`.
- [x] On `Khóa lựa chọn`, `Resolve`, `Reset` entry: cursor shown (`CursorLockMode.None`) for UI prompts.
- [x] Cursor trạng thái set synchronously on phase change — no frame delay.

---

## Ghi chú triển khai

*Derived from ADR-0003 Triển khai Guidelines:*

- Handle in `OnPhaseChanged()` alongside `PlayerInputMode` switch
- `Cursor.lockState = CursorLockMode.Locked` required for mouselook to work correctly in Unity
- Edge case: game loses focus (Alt+Tab) → Unity auto-unlocks cursor; re-lock on `OnApplicationFocus(true)` if phase is Sinh tồn ban đêm

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Mouselook camera rotation (separate camera hệ thống story)

---

## QA Test Cases

**Story Loại**: UI — manual walkthrough required.

- **AC-1**: Dịch vụ ban ngày shows cursor
  - Given: Game starts in Dịch vụ ban ngày
  - When: Player observes screen
  - Then: OS cursor visible; can click UI elements

- **AC-2**: Sinh tồn ban đêm hides cursor
  - Given: Phase transitions to Sinh tồn ban đêm
  - When: Player observes screen
  - Then: Cursor hidden; mouse di chuyển controls camera look

- **AC-3**: Khóa lựa chọn restores cursor
  - Given: Phase transitions from Sinh tồn ban đêm to EndingEvaluation
  - When: Player observes screen
  - Then: Cursor visible; can interact with outcome prompts

---

## Test Evidence

**Story Loại**: UI
**Required evidence**: Manual walkthrough doc — `production/qa/evidence/cursor-visibility-walkthrough.md`

**Trạng thái**: [x] Logic verified — 10/10 automated tests passing. Manual walkthrough pending sign-off.

- `Assets/_Project/Application/Editor/Tests/CursorVisibilityTests.cs` (10 automated tests — phase mapping logic)
- `production/qa/evidence/cursor-visibility-walkthrough.md` (manual walkthrough — pending tester sign-off)

---

## Dependencies

- Depends on: Story 001 (Phase-Gated Input)
- Unlocks: None (leaf story)
