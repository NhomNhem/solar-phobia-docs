---
title: 'Epic: Day Service & Selection'
description: 'Bản dịch tiếng Việt cho Epic: Day Service & Selection.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Lõi
> **GDD**: design/gdd/day-service-and-lựa chọn.md
> **Module kiến trúc**: DaySelectionUI (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories day-service-and-lựa chọn`

## Tổng quan

Day Service & Selection is the moral core of Solar Phobia's day phase—the moment where the player phải choose which 2 of 3 souls to save and which one to abandon to the sun. The hệ thống owns the lựa chọn UI, kiểm tra hợp lệ logic, and confirmation flow that locks the player's choice before night begins.

**Chủ đề**: "Moral weight and visceral discomfort" — The day phase isn't about "completing tasks"—it's about choosing who lives and who burns. The moment of abandonment—physically shoving a soul out of the shade—nên feel genuinely uncomfortable, like becoming the monster.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| (None) | No ADR exists for this hệ thống | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| (None tracked) | Selection UI, soul cards, kiểm tra hợp lệ, confirmation flow, "2 saved, 1 abandoned" rule | — |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/day-service-and-lựa chọn.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories day-service-and-lựa chọn` to break this epic into implementable stories.