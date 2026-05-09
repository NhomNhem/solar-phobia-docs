---
title: 'Story 007: Ngọc Cốt Relic Pickups — Ward Drain Multiplier'
---

> **Epic**: phase-state-machine
> **Status**: Done
> **Layer**: Feature
> **Type**: Logic
> **Manifest Version**: N/A (no control-manifest.md exists)

## Context

**GDD**: `design/gdd/game-state-phase-state-machine.md`
**Requirement**: `TR-state-005` (Survival system with relic pickups)

**ADR Governing Implementation**: ADR-0005: Survival System (Ward)
**ADR Decision Summary**: Ngọc Cốt relics increase Ward drain multiplicatively rather than additively.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Risk**: MEDIUM

---

## Acceptance Criteria

*From GDD `design/gdd/game-state-phase-state-machine.md`, scoped to this story:*

- [x] Ngọc Cốt pickups increase Ward drain multiplicatively.

---

## Implementation Notes

*Derived from ADR-0005 Implementation Guidelines:*

- NgọcCốtPickup prefab has collision trigger
- On pickup: increment bone count in GameStateManager
- WardService calculates drain: 1.0/s × (1 + boneCount × 0.25)
  - 0 bones: 1.0/s
  - 1 bone: 1.25/s
  - 2 bones: 1.5/s
  - 3 bones: 1.75/s
- Maximum 3 Ngọc Cốt pickups per night phase

**Bug fixes discovered during implementation:**
- WardTimerService had wrong additive formula; fixed to multiplicative: `baseDrainRate × (1 + boneCount × 0.25) × (1 + hallucinationMultiplier)`
- Soul.DaySelection/NightOutcome/Life were `internal set`; exposed as `private set` with `SetDaySelection`/`SetNightOutcome`/`SetLife` internal methods to preserve encapsulation while allowing internal mutation

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Story 008: Ward Timer initialization (different system)
- Story 009: Sensory tiers (UI feedback only)

---

## QA Test Cases

**[For Logic stories]:**

- **AC-1**: First Ngọc Cốt pickup increases drain by 25%
  - Given: WardService is active with 0 bones collected
  - When: Player picks up first Ngọc Cốt
  - Then: Drain rate changes from 1.0/s to 1.25/s

- **AC-2**: Second Ngọc Cốt adds additional 25% multiplier
  - Given: Player has 1 bone collected
  - When: Player picks up second Ngọc Cốt
  - Then: Drain rate changes from 1.25/s to 1.5/s

- **AC-3**: Third Ngọc Cốt caps at maximum
  - Given: Player has 2 bones collected
  - When: Player picks up third Ngọc Cốt
  - Then: Drain rate becomes 1.75/s (max), fourth pickup ignored

- **AC-4**: Drain multiplier applies on top of hallucination multiplier
  - Given: Player has 1 bone AND hallucination_multiplier = 0.5
  - When: WardService calculates drain
  - Then: Drain = 1.0 × (1 + 1 × 0.25) × (1 + 0.5) = 1.875/s

---

## Test Evidence

**Story Type**: Logic
**Required evidence**: `Assets/_Project/Application/Editor/Tests/NgocCotRelicPickupsTests.cs` — must exist and pass

**Status**: [x] Complete — implemented in `Assets/_Project/Domain/Services/INgocCotService.cs` and `Assets/_Project/Application/Services/NgocCotService.cs`. WardTimerService updated with multiplicative formula. Unit tests at `Assets/_Project/Application/Editor/Tests/NgocCotRelicPickupsTests.cs` (15 Ngọc Cốt tests) and `Assets/_Project/Application/Editor/Tests/WardDrainRateCalculationTests.cs` (5 drain formula tests, merged into same file). All 18 tests pass. Note: Dead `tests/` root folder deleted. All tests consolidated into `Assets/_Project/Application/Editor/Tests/`.

---

## Dependencies

- Depends on: Story 003 (Night Phase Movement)
- Unlocks: None (serves Story 008/009)