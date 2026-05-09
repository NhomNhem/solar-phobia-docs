---
title: 'Epic: Đèn quét boss Cá Ông'
description: 'Bản dịch tiếng Việt cho Epic: Đèn quét boss Cá Ông.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Feature
> **GDD**: design/gdd/boss-ca-ong-searchlight.md
> **Module kiến trúc**: BossSearchlight (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories boss-ca-ong-searchlight`

## Tổng quan

Boss Cá Ông (Whale) Searchlight is the persistent threat during Phase ban đêm—a massive whale skeleton in the background that sweeps a searchlight cone across the playable area. If the player is exposed (not in valid cover) during a sweep, they receive a strike warning, then a -30s Ward penalty. This creates constant tension and forces tactical di chuyển.

**Chủ đề**: "Relentless pursuit" — The whale is always there, always watching, always sweeping. The searchlight nên feel oppressive—a green cone of death that forces hiding like prey. Successful covers nên feel narrow survival.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| (None) | No ADR exists for this hệ thống | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| (None tracked) | Searchlight sweep behavior, cover detection, strike warning, Ward penalty | — |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/boss-ca-ong-searchlight.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories boss-ca-ong-searchlight` to break this epic into implementable stories.