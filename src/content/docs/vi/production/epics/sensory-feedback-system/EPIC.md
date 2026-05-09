---
title: 'Epic: Hệ thống phản hồi giác quan'
description: 'Bản dịch tiếng Việt cho Epic: Hệ thống phản hồi giác quan.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Lõi
> **GDD**: design/gdd/sensory-feedback-hệ thống.md
> **Module kiến trúc**: (Lõi layer — no dedicated module)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories sensory-feedback-hệ thống`

## Tổng quan

Hệ thống phản hồi giác quan provides diegetic, non-HUD information to the player about their survival trạng thái. Instead of watching a progress bar, the player feels danger approaching through progressive visual and audio degradation. The hệ thống maps Bộ đếm ward thresholds to sensory tiers that alter the player's perception without explicit numbers.

**Chủ đề**: "Unconscious awareness" — Knowing they're in danger without seeing numbers. The degradation nên create dread escalation—each tier feels worse than the last, building to "Hopeless Hope" where the player knows death is coming but fights anyway.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| (None) | No ADR exists for this hệ thống | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| (None tracked) | Ward timer thresholds → sensory tiers, visual degradation, audio degradation, diegetic feedback | — |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/sensory-feedback-hệ thống.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories sensory-feedback-hệ thống` to break this epic into implementable stories.