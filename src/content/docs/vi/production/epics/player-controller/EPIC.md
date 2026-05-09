---
title: 'Epic: Bộ điều khiển người chơi & Skills'
description: 'Bản dịch tiếng Việt cho Epic: Bộ điều khiển người chơi & Skills.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Lõi
> **GDD**: design/gdd/player-controller.md
> **Module kiến trúc**: PlayerController (from architecture.md)
> **Trạng thái**: Đang triển khai (2D Refactor + FSM Gap Fix — ADR-0003-v2)
> **Danh sách story**: 14 stories total — 2 new stories added to address FSM gap

## Tổng quan

Bộ điều khiển người chơi là hệ thống input và di chuyển, chuyển hành động của người chơi thành phản hồi trong game, đồng thời áp đặt những gì người chơi được hoặc không được làm theo phase hiện tại. Trong phase ban ngày, người chơi chỉ được tương tác qua UI như chọn NPC, phân bổ tài nguyên và xác nhận lựa chọn; không cho phép di chuyển vật lý. Trong phase ban đêm, hệ thống bật di chuyển WASD, sprint và tương tác theo ngữ cảnh khi người chơi đi từ miếu bắt đầu tới miếu kết thúc.

**Chủ đề**: "Ownership through contrast" — Daytime calm makes nighttime panic feel deserved, not ngẫu nhiên. When the player survives or fails, they nên liên hệ it to their lựa chọn trước đó, not to cơ chế thiếu công bằng.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| ADR-0003: Bộ điều khiển người chơi Pattern | New Input System + CharacterController with khóa theo phase enable/disable | HIGH |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| TR-player-001 | di chuyển WASD with sprint, dash, glide, swing actions (khóa theo phase) | ADR-0003 ✅ |
| TR-player-009 | PlayerStateMachine FSM with ReactiveProperty<EPlayerState> (Idle, Moving, Sprinting, etc.) | ADR-0003-v2 ✅ |
| TR-player-010 | Phase integration: subscribe to IPhaseStateMachine for Day/Night behavior changes | ADR-0003-v2 ✅ |

## Danh sách story

| Story | Tiêu đề | Loại | Độ ưu tiên | Trạng thái |
|-------|-------|------|----------|--------|
| story-001 | Phase-Gated Input | Logic | P0 | ✅ Hoàn tất (reused) |
| story-002 | WASD Movement (3D) | Logic | P0 | 📦 Đã được thay thế |
| story-003 | Sprint (3D) | Logic | P1 | 📦 Đã được thay thế |
| story-004 | Cover Detection (3D) | Logic | P1 | 📦 Đã được thay thế |
| story-005 | E-Key Interact | Logic | P1 | ✅ Hoàn tất (reused) |
| story-006 | Cursor Visibility | UI | P1 | ✅ Hoàn tất (reused) |
| story-002-v2 | A/D Movement 2D | Logic | P0 | ✅ Hoàn tất |
| story-003-v2 | Spirit Dash (-5s Ward) | Logic | P1 | ✅ Hoàn tất |
| story-004-v2 | Swing + Glide Skills | Logic | P1 | ✅ Hoàn tất |
| story-005-v2 | Coyote Time + Jump Buffer | Logic | P1 | ✅ Hoàn tất |
| story-006-v2 | Cover Detection 2D (Mộ Gió) | Logic | P1 | ✅ Hoàn tất |
| story-007-v2 | Phase ban ngày Swap + Shove | Logic | P1 | ✅ Hoàn tất |
| story-007 | Strike Warning Integration | Integration | P1 | Ready |
| story-008 | Relic Pickup Integration | Integration | P2 | Ready |
| **story-009** | **PlayerStateMachine Lõi (FSM)** | **Logic** | **P0** | **✅ Hoàn tất** |
| **story-010** | **PlayerStateMachine Phase Integration** | **Integration** | **P0** | **✅ Hoàn tất** |

**Triển khai order**: 009 → 010 → 002-v2 → 003-v2 → 004-v2 → 005-v2 → 006-v2 → 007-v2 → 007 → 008

> **Critical Gap Fixed**: Danh sách story 009-010 address the missing PlayerStateMachine FSM that was not covered in the original story list.

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/player-controller.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/dev-story production/epics/player-controller/story-001-khóa theo phase-input.md` to begin implementation.
