---
title: 'Epic: Điều phối trạng thái âm thanh'
description: 'Bản dịch tiếng Việt cho Epic: Điều phối trạng thái âm thanh.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Presentation
> **GDD**: design/gdd/audio-core-loop.md
> **Module kiến trúc**: AudioMixDirector (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories audio-trạng thái-director`

## Tổng quan

Điều phối trạng thái âm thanh controls the sonic identity of Solar Phobia's core loop. It manages day/night audio snapshots, khóa theo phase music transitions, and threat escalation cues. The audio nên feel like "watercolour on paper" — organic, textured, intimate, sound ON the page not OF the world.

**Chủ đề**: "Opposites in sound" — Day: warm, measured, contemplative (gentle waves on a quiet shore). Night: urgent, desperate, primal (being hunted by something ancient).

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| (None) | No ADR exists for this hệ thống | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| (None tracked) | Day/night audio mix, phase snapshots, threat escalation cues, ambient layers | — |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/audio-core-loop.md` are verified
- All Visual/Feel stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories audio-trạng thái-director` to break this epic into implementable stories.