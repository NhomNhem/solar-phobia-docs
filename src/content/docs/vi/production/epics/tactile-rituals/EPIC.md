---
title: 'Epic: Nghi lễ xúc giác'
description: 'Bản dịch tiếng Việt cho Epic: Nghi lễ xúc giác.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Lõi
> **GDD**: design/gdd/tactile-rituals.md
> **Module kiến trúc**: TactileRituals (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories tactile-rituals`

## Tổng quan

Nghi lễ xúc giác are the three minigames (diêm, rót, vay) that the player performs during Phase ban ngày to earn Hương Hỏa (Spirit Essence). Each ritual is a physical tương tác that feels grounded in Vietnamese cultural tradition—striking matches, pouring tea, fanning coals. Success earns tài nguyên; failure incurs penalties.

**Chủ đề**: "Deliberate craftsmanship" — Each action yêu cầu attention and physical timing, not just clicking. The rituals nên feel intimate and ritualistic—like actually performing the traditions. The minigames create the "tactile discomfort" of day phase before the physical panic of night.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| (None) | No ADR exists for this hệ thống | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| (None tracked) | Three minigames: diêm (match), rót (pour), vay (fan) with timing mechanics | — |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/tactile-rituals.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories tactile-rituals` to break this epic into implementable stories.