---
title: 'Story 005: E-Key Contextual Interact — Relic Pickup + Shrine Trigger'
description: 'Bản dịch tiếng Việt cho Story 005: E-Key Contextual Interact — Relic Pickup + Shrine Trigger.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Hoàn tất
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P1
> **Estimate**: 4 hours
> **Manifest Phiên bản**: N/A

## Bối cảnh

**GDD**: `design/gdd/player-controller.md`
**TR-ID**: `TR-player-005`
**ADR Governing Triển khai**: ADR-0003: Bộ điều khiển người chơi Pattern
**ADR Tóm tắt quyết định**: E-key raycast forward 2m. Tag `"CursedMound"` → fires `OnInteract("relic")`. Tag `"EndShrine"` → fires `OnInteract("shrine")`. No interactable nearby → silently ignored.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: HIGH

---

## Tiêu chí chấp nhận

- [x] Near CursedMound (Mo Oan), E key fires `OnInteract("relic")` event.
- [x] Near EndShrine, E key fires `OnInteract("shrine")` event.
- [x] E key with no interactable in range → silently ignored (no error popup, no log spam).
- [x] E-interact only đang hoạt động during `Sinh tồn ban đêm` phase.
- [x] Bone Relic pickup during đang hoạt động strike telegraph applies Time Drain immediately — does not cancel the strike.

---

## Ghi chú triển khai

*Derived from ADR-0003 Triển khai Guidelines:*

- `Physics.Raycast(transform.position, transform.forward, 2f)` on E press callback
- Tag checks: `hit.collider.CompareTag("CursedMound")` → `"relic"`, `CompareTag("EndShrine")` → `"shrine"`
- Guard: `if (_currentMode != NightMovement) return;`
- FalseSafeMound near-E: warning tell plays; no `OnInteract` event fired
- `OnInteract` is `event Action<string>` — subscriber xử lý downstream effects

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Time Drain modifier calculation (owned by Resource Effects hệ thống)
- Shrine win condition evaluation (owned by Mục tiêu miếu hệ thống)
- Relic pickup cross-hệ thống integration test (Story 008)

---

## QA Test Cases

- **AC-1**: E near CursedMound fires relic event
  - Given: Phase = Sinh tồn ban đêm; CursedMound within 2m forward
  - When: Player presses E
  - Then: `OnInteract("relic")` fires once

- **AC-2**: E near EndShrine fires shrine event
  - Given: Phase = Sinh tồn ban đêm; EndShrine within 2m forward
  - When: Player presses E
  - Then: `OnInteract("shrine")` fires once

- **AC-3**: E with nothing nearby → silent
  - Given: Phase = Sinh tồn ban đêm; no tagged object within 2m
  - When: Player presses E
  - Then: No event fired; no log output

- **AC-4**: E blocked outside Sinh tồn ban đêm
  - Given: Phase = Dịch vụ ban ngày; CursedMound within 2m
  - When: Player presses E
  - Then: No event fired

- **AC-5**: Pickup during strike telegraph
  - Given: Strike telegraph đang hoạt động; CursedMound within 2m
  - When: Player presses E
  - Then: `OnInteract("relic")` fires; strike is NOT cancelled

---

## Test Evidence

**Story Loại**: Logic
**Required evidence**: `tests/unit/player-controller/e-key-interact_test.cs` — unit tests phải exist and pass

**Trạng thái**: [x] Hoàn tất — 15/15 tests passing

- `Assets/_Project/Application/Editor/Tests/EKeyInteractTests.cs` (15 tests, AC-1 through AC-5 + multi-press + tag/payload constants)

---

## Dependencies

- Depends on: Story 001 (Phase-Gated Input)
- Unlocks: Story 008 (Relic Pickup Integration)
