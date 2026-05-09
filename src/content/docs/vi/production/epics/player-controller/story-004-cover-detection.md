---
title: 'Story 004: Cover Detection — Full Containment Validation'
description: 'Bản dịch tiếng Việt cho Story 004: Cover Detection — Full Containment Validation.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Đã được thay thế-by**: story-004-v2-cover-detection-2d.md
> **Reason**: 3D bounds containment replaced by 2D trigger overlap (Mộ Gió tombstones).
> **Trạng thái**: Đã được thay thế (see story-004-v2-cover-detection-2d.md)
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P1
> **Estimate**: 5 hours
> **Manifest Phiên bản**: N/A

## Bối cảnh

**GDD**: `design/gdd/player-controller.md`
**TR-ID**: `TR-player-004`
**ADR Governing Triển khai**: ADR-0003: Bộ điều khiển người chơi Pattern
**ADR Tóm tắt quyết định**: Player collider phải be fully inside cover volume (Mo Thuong, Mo Oan, FalseSafeMound) for cover to register. Partial overlap = exposed. `cover_enter_threshold` is configurable (default 1.0).

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: HIGH

---

## Tiêu chí chấp nhận

- [x] Player collider fully inside Mo Thuong cover volume → `IsInCover = true`.
- [x] Partial overlap with any cover volume → `IsInCover = false` (exposed).
- [x] `IsInCover` trạng thái published as `ReactiveProperty<bool>` for HUD and Map Director subscription.
- [x] Cover check runs only during `Sinh tồn ban đêm` phase.
- [x] `cover_enter_threshold` is configurable (default 1.0, range 0.8–1.0).

---

## Ghi chú triển khai

*Derived from ADR-0003 Triển khai Guidelines:*

- Bounds check: player `CharacterController.bounds` fully contained within cover volume `Collider.bounds`
- `CheckCover()` called in `Update()` when `_currentMode == NightMovement`
- Expose `IsInCover` as `ReactiveProperty<bool>` — fire only on trạng thái change
- FalseSafeMound: cover registers (`IsInCover = true`) but also fires a separate warning tell event
- `cover_enter_threshold`: fraction of player bounds that phải be inside (1.0 = fully inside)

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Strike damage negation (owned by Điều phối map và spawn)
- FalseSafeMound collapse penalty (owned by Điều phối map và spawn)
- Cover visual feedback / glow (Visual/Feel story)

---

## QA Test Cases

- **AC-1**: Full containment → IsInCover = true
  - Given: Player bounds fully inside Mo Thuong volume
  - When: `CheckCover()` runs
  - Then: `IsInCover = true`

- **AC-2**: Partial overlap → IsInCover = false
  - Given: Player bounds 50% inside cover volume
  - When: `CheckCover()` runs
  - Then: `IsInCover = false`

- **AC-3**: Cover check bị tắt outside Sinh tồn ban đêm
  - Given: Phase = Dịch vụ ban ngày
  - When: Player position overlaps cover volume
  - Then: `IsInCover` unchanged (check not running)

- **AC-4**: ReactiveProperty fires on trạng thái change only
  - Given: `IsInCover = false`
  - When: Player enters cover (full containment)
  - Then: `IsInCover` fires once with `true`; no repeat fires while staying inside

---

## Test Evidence

**Story Loại**: Logic
**Required evidence**: `tests/unit/player-controller/cover-detection_test.cs` — unit tests phải exist and pass

**Trạng thái**: [x] Hoàn tất — 20/20 tests passing

- `Assets/_Project/Application/Editor/Tests/CoverDetectionTests.cs` (20 tests, AC-1 through AC-4 + threshold + static helper)

---

## Dependencies

- Depends on: Story 002 (WASD Movement)
- Unlocks: Story 007 (Strike Warning Integration)

