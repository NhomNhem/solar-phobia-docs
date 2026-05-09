---
title: 'Story 008: Relic Pickup Integration — NgocCot → Resource Effects Cross-System'
description: 'Bản dịch tiếng Việt cho Story 008: Relic Pickup Integration — NgocCot → Resource Effects Cross-System.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Ready
> **Layer**: Lõi
> **Loại**: Integration
> **Độ ưu tiên**: P2
> **Estimate**: 4 hours
> **Manifest Phiên bản**: N/A

## Bối cảnh

**GDD**: `design/gdd/player-controller.md`
**TR-ID**: `TR-player-012`
**ADR Governing Triển khai**: ADR-0003: Bộ điều khiển người chơi Pattern
**ADR Tóm tắt quyết định**: E-key on CursedMound fires `OnInteract("relic")` which the Resource Effects hệ thống subscribes to, triggering Time Drain modifier and hallucination package. Cross-hệ thống event delivery via R3 Subject / MessagePipe.

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: MEDIUM

---

## Tiêu chí chấp nhận

- [ ] E-key on CursedMound fires `OnResourcePickedUp(NgocCot)` event received by Resource Effects hệ thống.
- [ ] Resource Effects hệ thống activates Time Drain modifier on receipt.
- [ ] Pickup during đang hoạt động strike telegraph applies Time Drain immediately — does not cancel the strike.
- [ ] Cross-hệ thống event delivery is reliable — no dropped event under normal frame rate (60fps).

---

## Ghi chú triển khai

*Derived from ADR-0003 Triển khai Guidelines:*

- Bộ điều khiển người chơi fires `OnInteract("relic")` (Story 005)
- A coordinator (GameFlowCoordinator or dedicated handler) maps `"relic"` → `IResourceEffectsService.OnResourcePickedUp(NgocCot)`
- Use R3 Subject or MessagePipe for cross-hệ thống bus
- Integration test: mock `IResourceEffectsService` subscriber, verify event payload contains `NgocCot` type and fires exactly once per pickup

---

## Out of Scope

*Handled by neighbouring stories — do not implement here:*

- Time Drain formula and drain rate calculation (owned by Resource Effects hệ thống)
- Hallucination visual package (owned by Module hiệu ứng nguyền rủa)
- E-key raycast logic (Story 005)

---

## QA Test Cases

- **AC-1**: Relic pickup event reaches Resource Effects
  - Given: Phase = Sinh tồn ban đêm; CursedMound within range
  - When: Player presses E
  - Then: `IResourceEffectsService` receives `OnResourcePickedUp(NgocCot)` exactly once

- **AC-2**: Time Drain activates on receipt
  - Given: Resource Effects service is subscribed
  - When: `OnResourcePickedUp(NgocCot)` fires
  - Then: Time Drain modifier is đang hoạt động in Resource Effects hệ thống

- **AC-3**: Pickup during strike telegraph
  - Given: Strike telegraph đang hoạt động
  - When: Player picks up relic
  - Then: Time Drain activates immediately; strike proceeds unaffected

- **AC-4**: No duplicate event
  - Given: Player picks up one relic
  - When: E pressed once
  - Then: `OnResourcePickedUp` fires exactly once (not twice)

---

## Test Evidence

**Story Loại**: Integration
**Required evidence**: `tests/integration/player-controller/relic-pickup-integration_test.cs` — phải exist and pass

**Trạng thái**: [ ] Not yet created

---

## Dependencies

- Depends on: Story 005 (E-Key Interact), Resource Effects epic (partial — `IResourceEffectsService` interface)
- Unlocks: None (leaf story)
