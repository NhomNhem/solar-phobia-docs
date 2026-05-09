---
title: 'Epic: Thiết kế ít HUD & Sensory Feedback'
description: 'Bản dịch tiếng Việt cho Epic: Thiết kế ít HUD & Sensory Feedback.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Presentation
> **GDD**: (referenced in hệ thống-index.md — no dedicated GDD)
> **Module kiến trúc**: SensoryFeedbackManager (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories hud-less-design`

## Tổng quan

Thiết kế ít HUD & Sensory Feedback provides diegetic, non-HUD information to the player about their survival trạng thái. Instead of watching progress bars, the player feels danger through progressive visual and audio degradation. This layer coordinates the Bộ đếm ward's sensory tiers with the Hệ thống phản hồi giác quan to create unconscious awareness of danger without explicit numbers.

**Chủ đề**: "Unconscious awareness" — The player knows they're in danger without seeing numbers. Each sensory tier builds dread, creating "Hopeless Hope" where the player knows death is coming but fights anyway.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| (None) | No ADR exists for this hệ thống | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| (None tracked) | Visual degradation, audio degradation, diegetic feedback, HUD-free design | — |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/ux/` (if any UX specs exist) are verified
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories hud-less-design` to break this epic into implementable stories.