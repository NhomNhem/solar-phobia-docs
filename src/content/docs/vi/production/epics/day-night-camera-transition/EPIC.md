---
title: 'Epic: Chuyển camera ngày/đêm'
description: 'Bản dịch tiếng Việt cho Epic: Chuyển camera ngày/đêm.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Foundation
> **GDD**: design/gdd/day-night-camera-transition.md
> **Module kiến trúc**: CameraDirector (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories day-night-camera-transition`

## Tổng quan

Chuyển camera ngày/đêm controls the visual perspective shift between the day and night phases. The day phase uses a fixed 2.5D top-down macro view (close-up on the market stall), while the night phase uses a side-scrolling camera that follows the player through the horizontal lane. The transition itself is abrupt and jarring—a deliberate design choice that reinforces the emotional contrast between calm deliberation and panic survival.

**Chủ đề**: "Visual disorientation and emotional whiplash" — The close day camera creates a false sense of safety; the pulled-back night camera shatters that illusion. What was contained is now exposed.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| ADR: Chuyển camera ngày/đêm | **Not yet created** | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| TR-camera-001 | Camera transition with FOV changes between day/night phases | ❌ No ADR — **BLOCKED** |

> ⚠️ **Warning**: Danh sách story for this epic will be marked Blocked until the ADR is created. Run `/architecture_decision` to create the ADR, then proceed.

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/day-night-camera-transition.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

1. Run `/architecture_decision` to create ADR for Chuyển camera ngày/đêm
2. Then run `/create-stories day-night-camera-transition` to break this epic into implementable stories