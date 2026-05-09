---
title: 'Story 001: Phase ban ngày Timeline — 4 Pressure Phases'
description: 'Bản dịch tiếng Việt cho Story 001: Phase ban ngày Timeline — 4 Pressure Phases.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: phase-trạng thái-machine
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Logic
> **Manifest Phiên bản**: N/A (no control-manifest.md exists)

## Bối cảnh

**GDD**: `design/gdd/game-trạng thái-phase-trạng thái-machine.md`
**Yêu cầu**: `TR-trạng thái-001` (Phase máy trạng thái with day/night cycle transitions)

**ADR Governing Triển khai**: ADR-0001: Máy trạng thái phase Architecture
**ADR Tóm tắt quyết định**: R3 ReactiveProperty-based máy trạng thái with 7 trạng thái and phase contract for action gating.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: HIGH
**Engine Notes**: R3 and VContainer are post-cutoff libraries — verify behavior against Unity 6 docs.

---

## Tiêu chí chấp nhận

*From GDD `design/gdd/game-trạng thái-phase-trạng thái-machine.md`, scoped to this story:*

- [ ] 5-minute timeline with escalating pressure phases (Stability → Tension → Crisis → Collapse)
- [ ] 0:00–1:30 (Stability): Space for 4 people (Tú + 3 souls)
- [ ] 1:30–3:00 (Tension): Shadows shrink 30%, Light Interrupts appear randomly, Souls enter Panic AI
- [ ] 3:00–4:30 (Crisis): Only space for 3 people, player phải Swap positions
- [ ] 4:30–5:00 (Collapse): One soul MUST be abandoned

---

## Ghi chú triển khai

*Derived from ADR-0001 Triển khai Guidelines:*

- Use R3 ReactiveProperty to track current timeline phase (Stability, Tension, Crisis, Collapse)
- Phase contract already define allowed actions per phase in ADR-0001
- Timeline advances automatically based on elapsed time from Dịch vụ ban ngày entry
- Emit TimelinePhaseChangedEvent when transitioning between timeline phases

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Story 002: Handles Swap/Shove mechanics at Collapse end
- Story 003: Handles Sinh tồn ban đêm di chuyển (different phase)
- Story 008: Handles Bộ đếm ward initialization at day→night transition

---

## QA Test Cases

**[For Logic stories — automated test specs]:**

- **AC-1**: Timeline starts at 0:00 and progresses through phases
  - Given: Dịch vụ ban ngày phase entered
  - When: Time elapses to 90 seconds
  - Then: Current timeline phase transitions from Stability to Tension
  - Edge cases: Pause menu stops timer, game speed affects progression

- **AC-2**: Crisis phase reduces available space
  - Given: Timeline enters Crisis phase (180s elapsed)
  - When: Player checks soul positions
  - Then: Only 3 souls can fit in shadow zone (not 4)
  - Edge cases: Player has saved 3 souls (impossible by design)

- **AC-3**: Collapse phase forces abandonment
  - Given: Timeline reaches Collapse phase (270s elapsed)
  - When: Player attempts to confirm lựa chọn
  - Then: Shove mechanic activates automatically
  - Edge cases: Timer expires at exact 300s (transition to Khóa lựa chọn)

---

## Test Evidence

**Story Loại**: Logic
**Required evidence**: `tests/unit/phase-trạng thái-machine/day-phase-timeline_test.cs` — phải exist and pass

**Trạng thái**: [ ] Not yet created

---

## Dependencies

- Depends on: None (foundational — Dịch vụ ban ngày already works)
- Unlocks: Story 002 (Phase ban ngày Mechanics)
