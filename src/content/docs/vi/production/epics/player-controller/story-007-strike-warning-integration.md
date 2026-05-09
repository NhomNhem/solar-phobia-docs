---
title: 'Story 007: Strike Warning Integration — Map Director Event → Reticle Icon'
description: 'Bản dịch tiếng Việt cho Story 007: Strike Warning Integration — Map Director Event → Reticle Icon.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Ready
> **Layer**: Lõi
> **Loại**: Integration
> **Độ ưu tiên**: P1
> **Estimate**: 5 hours
> **Manifest Phiên bản**: N/A

## Bối cảnh

**GDD**: `design/gdd/player-controller.md`
**TR-ID**: `TR-player-011`
**ADR Governing Triển khai**: ADR-0003-v2: Bộ điều khiển người chơi Pattern (2D)
**ADR Tóm tắt quyết định**: Bộ điều khiển người chơi receives `OnStrikeWarning` from Map Director and displays warning icon near reticle. Icon phải have z-order priority above Tier 4 panic effects (chromatic aberration). Player position + collider bounds sent to Map Director each frame during Sinh tồn ban đêm.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: HIGH

---

## Tiêu chí chấp nhận

- [ ] On receiving `OnStrikeWarning` from Map Director, warning icon appears near reticle.
- [ ] Warning icon z-order is above Tier 4 panic effects (chromatic aberration, screen shake). Note: Tier 4 = DeathSpiral sensory trạng thái (ward ≤ 10s).
- [ ] Multiple overlapping strike warnings display only the nearest/highest-priority icon (no UI clutter).
- [ ] Warning icon clears when strike resolves — no lingering icon after strike ends.
- [ ] Player position + collider bounds sent to Map Director each frame during `Sinh tồn ban đêm`.

---

## Ghi chú triển khai

*Derived from ADR-0003 Triển khai Guidelines:*

- Subscribe to `IMapSpawnDirector.OnStrikeWarning` observable
- Warning icon: Screen Space — Overlay canvas, highest sort order (2D screen-space chosen for UI consistency)
- Send position via `IMapSpawnDirector.UpdatePlayerPosition(Vector3, Bounds)` each frame in `Update()`
- Multiple warnings: track list, display only nearest by distance to player

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Strike damage calculation (owned by Điều phối map và spawn)
- Bộ đếm ward penalty on strike hit (owned by Bộ đếm ward)
- Strike warning visual design / animation (Visual/Feel story)

---

## QA Test Cases

- **AC-1**: OnStrikeWarning shows icon
  - Given: Phase = Sinh tồn ban đêm; player exposed (not in cover)
  - When: `OnStrikeWarning` event received from Map Director
  - Then: Warning icon visible near reticle

- **AC-2**: Icon z-order above panic effects
  - Given: Sensory tier = DeathSpiral (chromatic aberration đang hoạt động)
  - When: Strike warning fires
  - Then: Warning icon renders above chromatic aberration layer

- **AC-3**: Icon clears after strike resolves
  - Given: Warning icon is showing
  - When: Strike resolves (Map Director fires `OnStrikeResolved`)
  - Then: Warning icon hidden

- **AC-4**: Multiple warnings → single icon
  - Given: Two simultaneous strike warnings
  - When: Both `OnStrikeWarning` event received
  - Then: Only one icon shown (nearest strike)

- **AC-5**: Position sent to Map Director
  - Given: Phase = Sinh tồn ban đêm
  - When: Each frame
  - Then: `IMapSpawnDirector.UpdatePlayerPosition` called with current position + bounds

---

## Test Evidence

**Story Loại**: Integration
**Required evidence**: `tests/integration/player-controller/strike-warning_test.cs` OR documented playtest in `production/qa/evidence/strike-warning-playtest.md`

**Trạng thái**: [ ] Not yet created

---

## Dependencies

- Depends on: story-006-v2 (Cover Detection 2D), Điều phối map và spawn epic (partial — `IMapSpawnDirector` interface)
- Unlocks: None (leaf story)
