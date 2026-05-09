---
title: 'Epic: Điều phối map và spawn'
description: 'Bản dịch tiếng Việt cho Epic: Điều phối map và spawn.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Foundation
> **GDD**: design/gdd/map-and-spawn-director.md
> **Module kiến trúc**: MapSpawnDirector (from architecture.md)
> **Trạng thái**: Đang triển khai
> **Danh sách story**: 7 stories created — see below

## Tổng quan

Điều phối map và spawn controls night-phase spatial pressure in the Act 1 vertical slice. It owns route layout, fog-limited visibility, grave mound placement, shrine endpoints, and boss searchlight strike targeting windows. The player experiences this as a desperate traversal from Am Tho Bai Thuyen to the next safe shrine through a beach lane where cover, cursed pickups, and scanning threat phải be read in real time.

**Chủ đề**: "Hunted and morally cornered" — The map is not an arena to dominate; it is a haunted corridor where every detour for Bone Relics (`Ngoc Cot`) trades safety for guilt and time loss.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| ADR-0006: Map Generation Strategy | **Not yet created** | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| TR-map-001 | Procedural generation with xác định seed, chunk spawning | ❌ No ADR — **BLOCKED** |

> ⚠️ **Warning**: Danh sách story for this epic will be marked Blocked until ADR-0006 is created. Run `/architecture_decision` to create the ADR, then proceed.

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/map-and-spawn-director.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

1. Run `/architecture_decision` to create ADR-0006 (Map Generation Strategy)
2. Then run `/create-stories map-spawn-director` to break this epic into implementable stories
## Danh sách story

| Story | Tiêu đề | Loại | Độ ưu tiên | Trạng thái |
|-------|-------|------|----------|--------|
| story-001 | Deterministic Seed + Chunk Generation | Logic | P0 | Ready |
| story-002 | Sweep Exposure Check | Logic | P0 | Ready |
| story-003 | Strike Telegraph + Penalty | Logic | P0 | Ready |
| story-004 | Route Viability Check | Logic | P1 | Ready |
| story-005 | Cover Density Validation | Logic | P1 | Ready |
| story-006 | IMapSpawnDirector Interface (Bộ điều khiển người chơi signals) | Logic | P0 | Ready |
| story-007 | Bone Relic Time Drain Event | Integration | P1 | Ready |

**Triển khai order**: 001 → 002 → 003 → 006 → 004 → 005 → 007

## Danh sách story

| Story | Tiêu đề | Loại | Độ ưu tiên | Trạng thái |
|-------|-------|------|----------|--------|
| story-001 | Deterministic Seed + Chunk Generation | Logic | P0 | Ready |
| story-002 | Sweep Exposure Check | Logic | P0 | Ready |
| story-003 | Strike Telegraph + Penalty | Logic | P0 | Ready |
| story-004 | Route Viability Check | Logic | P1 | Ready |
| story-005 | Cover Density Validation | Logic | P1 | Ready |
| story-006 | IMapSpawnDirector Interface | Logic | P0 | Ready |
| story-007 | Bone Relic Time Drain Event | Integration | P1 | Ready |

**Triển khai order**: 001 → 002 → 003 → 006 → 004 → 005 → 007
