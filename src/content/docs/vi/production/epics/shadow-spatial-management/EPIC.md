---
title: 'Epic: Quản lý không gian bóng'
description: 'Bản dịch tiếng Việt cho Epic: Quản lý không gian bóng.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Foundation
> **GDD**: design/gdd/shadow-spatial-management.md
> **Module kiến trúc**: ShadowManager (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories shadow-spatial-management`

## Tổng quan

Quản lý không gian bóng controls the shrinking shadow polygon and thermal death zones during Solar Phobia's day phase. As the Mặt Trời Rỗng (Hollow Sun) rises, the safe zone (bóng râm xanh lam) shrinks via polygon contraction, forcing 3 souls and the player into tighter space.

**Chủ đề**: "Trapped and morally burdened" — The sun is an đang hoạt động threat judging their choices. As the safe zone contract, the player realizes they cannot save everyone. The moment of pushing a soul into sunlight nên feel genuinely uncomfortable, like condemning someone to a terrible death.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| ADR: Quản lý không gian bóng | **Not yet created** | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| TR-shadow-001 | Shadow polygon with shrink mechanics and thermal death zones | ❌ No ADR — **BLOCKED** |

> ⚠️ **Warning**: Danh sách story for this epic will be marked Blocked until the ADR is created. Run `/architecture_decision` to create the ADR, then proceed.

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/shadow-spatial-management.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

1. Run `/architecture_decision` to create ADR for Quản lý không gian bóng
2. Then run `/create-stories shadow-spatial-management` to break this epic into implementable stories