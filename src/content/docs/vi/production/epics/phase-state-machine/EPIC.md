---
title: 'Epic: Máy trạng thái phase'
description: 'Bản dịch tiếng Việt cho Epic: Máy trạng thái phase.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Foundation
> **GDD**: design/gdd/game-trạng thái-phase-trạng thái-machine.md
> **Module kiến trúc**: PhaseStateMachine (from architecture.md)
> **Trạng thái**: Đang triển khai
> **Danh sách story**: 9 stories created

## Tổng quan

The Máy trạng thái phase is the có thẩm quyền runtime controller for Solar Phobia's core loop. It transitions the run through Day Service, Choice Lock, Night Survival, and Resolve/Reset phases, enforcing which hệ thống are đang hoạt động in each phase so rules cannot overlap incorrectly.

**Chủ đề**: "Opposites Attract" — The static, tactile deliberation of Day (hy vọng giả tạo) versus the frantic, physical panic of Night (tốc độ cuồng nộ). The game tests "Hopeless Hope" — the unbearable tension between wanting to save everyone and the mathematical impossibility of doing so.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| ADR-0001: Máy trạng thái phase Architecture | R3 ReactiveProperty-based máy trạng thái with 7 trạng thái (Khởi tạo, Dịch vụ ban ngày, Khóa lựa chọn, Sinh tồn ban đêm, Resolve, Reset, Lỗi nghiêm trọng) and phase contract for action gating | HIGH |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| TR-trạng thái-001 | Phase máy trạng thái with day/night cycle transitions | ADR-0001 ✅ |
| TR-trạng thái-002 | Day/phase ban đêm transitions with khóa theo phase hệ thống activation | ADR-0001 ✅ |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/game-trạng thái-phase-trạng thái-machine.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Danh sách story

| # | Tiêu đề | Layer | Loại | Trạng thái |
|---|-------|-------|------|--------|
| 001 | Phase ban ngày Timeline — 4 Pressure Phases | Foundation | Logic | Ready |
| 002 | Phase ban ngày Mechanics (Light/Shadows) | Lõi | Logic | Ready |
| 003 | Phase ban đêm Movement (Speed Reduction) | Lõi | Logic | Ready |
| 004 | Cover Detection (Mound Colliders) | Feature | Logic | Ready |
| 005 | Boss Searchlight (Detection Sweep) | Feature | Integration | Ready |
| 006 | Karma Hazards (Curse Spawning) | Feature | Logic + Integration | Ready |
| 007 | Ngọc Cốt Relic Pickups | Feature | Logic | Ready |
| 008 | Bộ đếm ward Initialization | Feature | Logic | Ready |
| 009 | Sensory Tiles (Detection Thresholds) | Presentation | Logic + UI | Ready |

## Bước tiếp theo

Start implementing Story 001 (foundational — Phase ban ngày Timeline).