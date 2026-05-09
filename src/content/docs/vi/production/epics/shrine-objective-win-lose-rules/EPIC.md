---
title: 'Epic: Mục tiêu miếu & Luật thắng/thua'
description: 'Bản dịch tiếng Việt cho Epic: Mục tiêu miếu & Luật thắng/thua.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Lõi
> **GDD**: design/gdd/shrine-objective-win-lose-rules.md
> **Module kiến trúc**: ShrineObjective (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories shrine-objective-win-lose-rules`

## Tổng quan

Mục tiêu miếu & Luật thắng/thua defines the conditions that end the night survival phase—specifically, what constitutes a "win" (reaching the EndShrine) and a "lose" (Bộ đếm ward reaching zero). The hệ thống owns the win/lose detection logic, the shrine arrival event flow, and the failure/death sequence.

**Chủ đề**: "Desperate hope" — Each step closer to the shrine is a step away from the whale's jaws. Reaching the shrine nên bring overwhelming relief and salvation—the nightmare ends, the whale won't get you, your choices mattered.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| (None) | No ADR exists for this hệ thống | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| (None tracked) | Win condition (reach EndShrine), lose condition (Ward = 0), shrine arrival event, death sequence | — |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/shrine-objective-win-lose-rules.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories shrine-objective-win-lose-rules` to break this epic into implementable stories.