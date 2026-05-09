---
title: 'Epic: Chen lấn vật lý và đẩy'
description: 'Bản dịch tiếng Việt cho Epic: Chen lấn vật lý và đẩy.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Lõi
> **GDD**: design/gdd/physical-crowding-and-push.md
> **Module kiến trúc**: (Lõi layer — no dedicated module)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories physical-crowding-and-push`

## Tổng quan

Chen lấn vật lý và đẩy controls the spatial dynamics between Tú and the 3 NPCs (souls) during Phase ban ngày. As the shadow shrinks, space becomes insufficient for all 4 characters, creating physical挤压 (crowding) that forces the player to make difficult positional decisions. The Push mechanic at phase end forces one soul out of the safe zone, writing the `sacrificed_ghost_id`.

**Chủ đề**: "Claustrophobic pressure" — The shadow walls closing in, souls pressed against each other, no room to breathe. The Push mechanic nên feel guilt-inducing—forcibly shoving someone out, screen shake, audio impact, the soul burning with a scream.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| (None) | No ADR exists for this hệ thống | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| (None tracked) | RigidBody collision, crowding physics, push mechanic | — |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/physical-crowding-and-push.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories physical-crowding-and-push` to break this epic into implementable stories.