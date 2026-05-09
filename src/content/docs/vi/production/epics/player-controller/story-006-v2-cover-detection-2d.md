---
title: 'Story 006-v2: Cover Detection 2D — Mộ Gió Trigger Overlap'
description: 'Bản dịch tiếng Việt cho Story 006-v2: Cover Detection 2D — Mộ Gió Trigger Overlap.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Hoàn tất
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P1
> **Replaces**: story-004-cover-detection.md (3D bounds — archived)

## Bối cảnh

**GDD**: Master GDD V5.0 — Section 3.2
**ADR**: ADR-0003-v2

Player hides behind Mộ Gió (tombstones). Cover = 2D trigger overlap, not 3D bounds containment.

## Tiêu chí chấp nhận

- [x] Player overlapping Mộ Gió trigger → IsInCover = true.
- [x] Player exits trigger → IsInCover = false.
- [x] IsInCover published as ReactiveProperty<bool>.
- [x] Cover check only đang hoạt động during Sinh tồn ban đêm phase.
- [x] FalseSafeMound: IsInCover = true but fires separate warning event.

## Ghi chú triển khai

- ICoverDetector2D.NotifyOverlapEnter(tag) / NotifyOverlapExit(tag)
- MonoBehaviour calls these from OnTriggerEnter2D / OnTriggerExit2D
- No bounds math needed — Unity handles overlap detection

## Test Evidence

**Story Loại**: Logic
**Required**: unit tests in Editor/Tests/

**Trạng thái**: [x] Hoàn tất — 15/15 tests passing

- `Assets/_Project/Application/Editor/Tests/CoverDetection2DTests.cs` (15 tests)

