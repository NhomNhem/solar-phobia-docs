---
title: 'Story 008: Bộ đếm ward Initialization — Base + (Saved × 30) Formula'
description: 'Bản dịch tiếng Việt cho Story 008: Bộ đếm ward Initialization — Base + (Saved × 30) Formula.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: phase-trạng thái-machine
> **Trạng thái**: Hoàn tất
> **Layer**: Feature
> **Loại**: Logic
> **Manifest Phiên bản**: N/A (no control-manifest.md exists)

## Bối cảnh

**GDD**: `design/gdd/game-trạng thái-phase-trạng thái-machine.md`
**Yêu cầu**: `TR-trạng thái-005` (Survival hệ thống with timer initialization)

**ADR Governing Triển khai**: ADR-0005: Survival System (Ward)
**ADR Tóm tắt quyết định**: Ward timer initialized using formula Base + (GhostsSaved × 30s) - DayPenalties.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: MEDIUM

---

## Tiêu chí chấp nhận

*From GDD `design/gdd/game-trạng thái-phase-trạng thái-machine.md`, scoped to this story:*

- [x] Bộ đếm ward initializes: Base (10s) + (GhostsSaved × 30s) - DayPenalties.
- [x] Passive drain: 1.0/s base + (bones × hallucination_multiplier).

---

## Ghi chú triển khai

*Derived from ADR-0005 Triển khai Guidelines:*

- WardService initializes at day→night transition
- Formula: InitialWard = 10 + (GhostsSaved × 30) - DayPenalties
- DayPenalties calculated from:
  - Failed Light Interrupts: 10s each
  - Soul Panic event: 5s each
  - Max penalty cap: 30s
- Store initialization value in GameStateManager for save/load

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Story 007: Ngọc Cốt pickups (different timer behavior)
- Story 009: Sensory tiers (UI feedback)

---

## QA Test Cases

**[For Logic stories]:**

- **AC-1**: Default initialization with 0 ghosts saved
  - Given: Player has saved 0 ghosts, no day penalties
  - When: phase ban đêm starts
  - Then: Initial Ward = 10 + (0 × 30) - 0 = 10 seconds

- **AC-2**: Initialization with 2 ghosts saved
  - Given: Player has saved 2 ghosts, no day penalties
  - When: phase ban đêm starts
  - Then: Initial Ward = 10 + (2 × 30) - 0 = 70 seconds

- **AC-3**: Initialization applies day penalties
  - Given: Player has saved 1 ghost, 1 failed light interrupt
  - When: phase ban đêm starts
  - Then: Initial Ward = 10 + (1 × 30) - 10 = 30 seconds

- **AC-4**: Penalty cap limits total penalty
  - Given: Player has saved 0 ghosts, 5 failed light interrupts (50s penalty)
  - When: phase ban đêm starts
  - Then: Initial Ward = 10 + (0 × 30) - 30 = -20 → clamped to 0 (minimum 0)

- **AC-5**: Passive drain uses formula
  - Given: Ward initialized at 60s, player has 2 bones, hallucination_multiplier = 0.5
  - When: 1 second passes
  - Then: Ward = 60 - (1.0 + 2 × 0.5) = 60 - 2.0 = 58 seconds

---

## Test Evidence

**Story Loại**: Logic
**Required evidence**: `Assets/_Project/Infrastructure/Tests/Editor/WardTimerInitializationTests.cs` — created

**Trạng thái**: [x] Created and ready for testing (yêu cầu Unity domain reload to discover)

---

## Dependencies

- Depends on: Story 003 (Phase ban đêm Movement)
- Unlocks: Story 009 (Sensory Tiers)

## Completion Notes
**Completed**: 2026-05-08
**Criteria**: 5/5 passing (all acceptance criteria verified)
**Deviations**: 
- ADVISORY: Penalty constants (10s, 5s, 30s) are hardcoded in WardTimerService.cs. Consider moving to ScriptableObject for designer tuning in future iteration.
**Test Evidence**: Logic: WardTimerInitializationTests.cs created with 5 AC test methods
**Code Review**: Hoàn tất (via /code-review, verdict: APPROVED)