---
title: 'Story 009: Sensory Tiers — Detection Threshold Feedback'
description: 'Bản dịch tiếng Việt cho Story 009: Sensory Tiers — Detection Threshold Feedback.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: phase-trạng thái-machine
> **Trạng thái**: Hoàn tất
> **Layer**: Presentation
> **Loại**: Logic + UI
> **Estimate**: 12 hours
> **Manifest Phiên bản**: N/A (no control-manifest.md exists)

## Bối cảnh

**GDD**: `design/gdd/game-trạng thái-phase-trạng thái-machine.md`
**Yêu cầu**: `TR-trạng thái-005` (Survival hệ thống with sensory feedback)

**ADR Governing Triển khai**: ADR-0005: Survival System (Ward)
**ADR Tóm tắt quyết định**: Sensory tiers trigger at 75%, 50%, 25%, ≤10s thresholds with visual/audio feedback.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: LOW

---

## Tiêu chí chấp nhận

*From GDD `design/gdd/game-trạng thái-phase-trạng thái-machine.md`, scoped to this story:*

- [x] Sensory tiers trigger at 75%, 50%, 25%, ≤10s thresholds.
- [x] Ward = 0 triggers death/Resolve failure.

---

## Ghi chú triển khai

*Derived from ADR-0005 Triển khai Guidelines:*

**Hiệu năng Budget**: <0.1ms per frame for tier calculation (simple percentage comparison, no allocations)

- SensoryTierService monitors Ward value each frame
- Triggers tier event at thresholds:
  - Tier 1 (75%): Normal warning — subtle UI pulse
  - Tier 2 (50%): Medium warning — screen edge vignette red
  - Tier 3 (25%): Critical warning — heartbeat audio + screen shake
  - Tier 4 (≤10s): Near-death — intense audio + full screen flash
- Ward reaches 0: emit NightFailedEvent → PhaseStateMachine transitions to NightOutcomeState

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Story 003: Sinh tồn ban đêm di chuyển (no tier feedback)
- Story 008: Ward timer initialization (different hệ thống)

---

## QA Test Cases

**[For Logic + UI stories]:**

- **AC-1**: Tier 1 triggers at 75% Ward remaining
  - Given: Ward = 80 seconds (initial 100s max)
  - When: Ward drops to 75 seconds
  - Then: Tier 1 event fires, subtle UI pulse visible

- **AC-2**: Tier 2 triggers at 50% Ward remaining
  - Given: Ward = 50 seconds
  - When: Ward drops to 50 seconds
  - Then: Tier 2 event fires, screen edge vignette turns red

- **AC-3**: Tier 3 triggers at 25% Ward remaining
  - Given: Ward = 25 seconds
  - When: Ward drops below 25 seconds
  - Then: Tier 3 event fires, heartbeat audio plays, screen shake occurs

- **AC-4**: Tier 4 triggers at ≤10 seconds
  - Given: Ward = 10 seconds
  - When: Ward drops to 10 or below
  - Then: Tier 4 event fires, intense audio, full screen flash

- **AC-5**: Ward reaching 0 triggers death
  - Given: Ward = 1 second
  - When: 1 second passes and Ward reaches 0
  - Then: NightFailedEvent emitted, phase transitions to NightOutcomeState with Death outcome

- **AC-6**: Tier event fire only once per threshold crossing
  - Given: Ward crossed from 76 to 74 (Tier 1)
  - When: Ward stays at 73 then goes to 75 then back to 74
  - Then: No additional Tier 1 event (only fires on crossing down)

---

## Test Evidence

**Story Loại**: Logic + UI
**Required evidence**: 
- `tests/unit/phase-trạng thái-machine/sensory-tiers_test.cs` — unit tests phải exist and pass
- `tests/integration/phase-trạng thái-machine/sensory-tiers_ui_test.cs` — integration test with HUD phải exist and pass

**Trạng thái**: [x] Hoàn tất — 33/33 tests passing

- `Assets/_Project/Infrastructure/Tests/Editor/SensoryTierTests.cs` — 15 unit tests (AC-1 through AC-6 + edge cases)
- `Assets/_Project/Infrastructure/Tests/Editor/SensoryTierIntegrationTests.cs` — 7 integration tests with WardTimerService

---

## Dependencies

- Depends on: Story 008 (Bộ đếm ward Initialization)
- Unlocks: None (final story in epic)