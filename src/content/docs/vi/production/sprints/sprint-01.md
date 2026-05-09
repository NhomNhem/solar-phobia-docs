---
title: 'Sprint 1 -- 2026-05-07 to 2026-05-14'
description: 'Bản dịch tiếng Việt cho Sprint 1 -- 2026-05-07 to 2026-05-14.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

## Sprint Goal
Establish the foundation layer: implement Máy trạng thái phase and Kho dữ liệu linh hồn that all other hệ thống depend on.

## Capacity
- Total days: 7
- Buffer (20%): 1.4 days reserved for unplanned work
- Available: 5.6 days

## Tasks

### Phải Have (Critical Path)

| ID | Task | Agent/Owner | Est. Days | Dependencies | Tiêu chí chấp nhận |
|----|------|-------------|-----------|-------------|-------------------|
| SP1-001 | Create Máy trạng thái phase with all 7 trạng thái (Khởi tạo, Dịch vụ ban ngày, Khóa lựa chọn, Sinh tồn ban đêm, Resolve, Reset, Lỗi nghiêm trọng) | unity-specialist | 2.0 | — | Phase transitions work, event fire correctly |
| SP1-002 | Create Kho dữ liệu linh hồn (3 souls: Linh, Van, Minh) with phase-locked writes | unity-specialist | 1.5 | SP1-001 | GetSoul, GetSavedSouls, GetAbandonedSoul all work |
| SP1-003 | Create VContainer installers for core hệ thống | unity-specialist | 0.5 | SP1-001, SP1-002 | All registered services resolve correctly |
| SP1-004 | Create R3 reactive bindings for phase trạng thái | unity-specialist | 1.0 | SP1-001 | CurrentPhase observable fires on trạng thái changes |

### Nên Have

| ID | Task | Agent/Owner | Est. Days | Dependencies | Tiêu chí chấp nhận |
|----|------|-------------|-----------|-------------|-------------------|
| SP1-005 | Write unit tests for Máy trạng thái phase | unity-specialist | 0.5 | SP1-001 | 80% coverage, all transitions tested |
| SP1-006 | Write unit tests for Soul Repository | unity-specialist | 0.5 | SP1-002 | 80% coverage, phase locking tested |

### Nice to Have

| ID | Task | Agent/Owner | Est. Days | Dependencies | Tiêu chí chấp nhận |
|----|------|-------------|-----------|-------------|-------------------|
| SP1-007 | Setup basic scene with VContainer bootstrap | unity-specialist | 0.5 | SP1-003 | Scene loads without errors |

## Carryover from Previous Sprint
N/A - First sprint

## Risks

| Rủi ro | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| R3 API unfamiliar | Medium | High | Tham chiếu ADR-0001 patterns, check current-best-practices.md |
| VContainer setup complexity | Low | Medium | Follow ADR patterns exactly |

## Dependencies on External Factors
- None - this is the foundation layer

## Định nghĩa hoàn thành for this Sprint
- [ ] All Phải Have tasks completed
- [ ] All tasks pass acceptance criteria
- [ ] No S1 or S2 bugs in delivered features
- [ ] Design documents updated for any deviations
- [ ] Code reviewed and merged

## Notes
- Per ADR-0001: Máy trạng thái phase phải use R3 ReactiveProperty
- Per ADR-0002: Soul Repository phải use Dictionary for O(1) lookup
- Target: 5.6 days of work, 1.4 days buffer
- Danh sách story will be created from this sprint plan