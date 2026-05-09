---
title: 'Story 002: Phase ban ngày Mechanics — Swap/Shove Souls'
description: 'Bản dịch tiếng Việt cho Story 002: Phase ban ngày Mechanics — Swap/Shove Souls.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: phase-trạng thái-machine
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Logic
> **Manifest Phiên bản**: N/A

## Bối cảnh

**GDD**: `design/gdd/game-trạng thái-phase-trạng thái-machine.md`
**Yêu cầu**: `TR-trạng thái-001` (Phase máy trạng thái with day/night cycle transitions)

**ADR Governing Triển khai**: ADR-0001: Máy trạng thái phase Architecture
**ADR Tóm tắt quyết định**: R3 ReactiveProperty-based máy trạng thái with 7 trạng thái and phase contract for action gating.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: HIGH
**Engine Notes**: R3 and VContainer are post-cutoff libraries.

---

## Tiêu chí chấp nhận

*From GDD `design/gdd/game-trạng thái-phase-trạng thái-machine.md`, scoped to this story:*

- [ ] Swap mechanic allows repositioning souls (0.5s animation, no jump-over)
- [ ] Shove mechanic forces one soul abandonment at phase end
- [ ] `sacrificed_ghost_id` is written and persisted to night phase

---

## Ghi chú triển khai

*Derived from ADR-0001 Triển khai Guidelines:*

- Swap: When player approaches soul from edge and presses interact, swap positions (0.5s animation)
- Shove: At Collapse phase end (or timer expiry), player MUST push one soul out of shadow
- Screen shake + audio impact + soul burn animation triggers on shove
- sacrificed_ghost_id written to SoulRepository before Khóa lựa chọn → Sinh tồn ban đêm transition

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Story 001: Timeline phases (Stability → Tension → Crisis → Collapse)
- Story 006: Karma hazards (what spawns based on sacrificed_ghost_id)
- Story 008: Ward initialization (how value is calculated)

---

## QA Test Cases

**[For Logic stories — automated test specs]:**

- **AC-1**: Swap repositions soul with 0.5s animation
  - Given: Player in Dịch vụ ban ngày, adjacent to soul at shadow edge
  - When: Player initiates Swap (interact key near soul)
  - Then: 0.5s animation plays, player and soul swap positions
  - Edge cases: Player attempts swap during animation (ignored), soul in Panic AI (may fail)

- **AC-2**: Shove forces one soul out of shadow at Collapse end
  - Given: Dịch vụ ban ngày timeline reaches Collapse phase (270s+)
  - When: Player confirms or timer expires
  - Then: Shove animation triggers, soul pushed into sunlight, soul burns with scream
  - Edge cases: No soul selected for abandonment (auto-select via fallback priority)

- **AC-3**: sacrificed_ghost_id persists to night phase
  - Given: Shove mechanic executed, soul marked Abandoned
  - When: Transition from Khóa lựa chọn to Sinh tồn ban đêm
  - Then: SoulRepository.NightOutcomeState reflects abandoned soul ID
  - Edge cases: Multiple souls abandoned (impossible by design), auto-commit with fallback

---

## Test Evidence

**Story Loại**: Logic
**Required evidence**: `tests/unit/phase-trạng thái-machine/day-phase-mechanics_test.cs` — phải exist and pass

**Trạng thái**: [ ] Not yet created

---

## Dependencies

- Depends on: Story 001 (Phase ban ngày Timeline) — Collapse phase phải exist before Shove
- Unlocks: Story 006 (Karma Hazards) — needs sacrificed_ghost_id

---

## Completion Notes

**Completed**: 2026-05-07
**Criteria**: 3/3 passing (all acceptance criteria met)

**Files Modified**:
- `Assets/_Project/Application/Services/DayPhaseMechanicsService.cs` (implemented)
- `Assets/_Project/Application/Editor/Tests/DayPhaseMechanicsTests.cs` (12 tests)

**Test Evidence**: Logic: `Assets/_Project/Application/Editor/Tests/DayPhaseMechanicsTests.cs` (12 tests, passing)

**Code Review**: APPROVED WITH SUGGESTIONS (from `/code-review` run)

**Deviations**: None — Triển khai matches ADR-0001 and story requirements.

**Tech debt logged**: None

**Next recommended**: `/story-readiness production/epics/phase-trạng thái-machine/story-003-night-phase-di chuyển.md`
