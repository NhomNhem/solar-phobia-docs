---
title: 'Story 007: Bone Relic Time Drain Event — Cross-System Integration'
description: 'Bản dịch tiếng Việt cho Story 007: Bone Relic Time Drain Event — Cross-System Integration.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: map-spawn-director
> **Trạng thái**: Hoàn tất
> **Layer**: Foundation
> **Loại**: Integration
> **Độ ưu tiên**: P1
> **Estimate**: 4 hours

## Bối cảnh

**GDD**: `design/gdd/map-and-spawn-director.md` — Time Drain Under Bone Relic formula
**TR-ID**: `TR-map-008`
**ADR**: ADR-0006

**Formula**: `effective_drain = base_drain_rate * (1 + bones_carried * hallucination_multiplier)`

## Tiêu chí chấp nhận

- [x] TimeDrainCalculator.CalculateEffectiveDrain formula verified.
- [x] base_drain_rate configurable (default 1.0).
- [x] hallucination_multiplier configurable (default 0.5).
- [x] Effective drain clamped to MaxSafeDrainRate (20.0).
- [x] Formula: base * (1 + bones * multiplier) verified for 0-3 bones.

## Dependencies

- Depends on: Story 001 (seed), Story 006 (interface)
- Unblocks: player-controller story-008 (Relic Pickup Integration)

## Test Evidence

**Story Loại**: Integration
**Required**: `Assets/_Project/Application/Editor/Tests/TimeDrainIntegrationTests.cs`

**Trạng thái**: [x] Hoàn tất — 12/12 tests passing

- `Assets/_Project/Application/Editor/Tests/TimeDrainTests.cs` (12 tests)

