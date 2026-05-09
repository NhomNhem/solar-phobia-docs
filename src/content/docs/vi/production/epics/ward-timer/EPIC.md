---
title: 'Epic: Bộ đếm ward / Nước Mắm Cốt'
description: 'Bản dịch tiếng Việt cho Epic: Bộ đếm ward / Nước Mắm Cốt.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Foundation
> **GDD**: design/gdd/health-stamina-damage-rules.md
> **Module kiến trúc**: WardTimer (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories ward-timer`

## Tổng quan

Máu/thể lực & Luật sát thương defines the unified survival tài nguyên hệ thống that merges traditional "health" and "stamina" into a single mechanic called **Spirit Ward** (Nước Mắm Cốt). This hệ thống tracks the player's humanity and survival time during the night phase, acting as both the timer and the health bar.

**Chủ đề**: "Time pressure and vulnerability" — Every second counts, and every choice has a time cost. The player never feels safe because the timer is always ticking. When Ward drops to critical levels (≤25%), the screen nên feel terrifying: chromatic aberration, audio distortion, and the sense that death is imminent.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| ADR-0005: Bộ đếm ward Triển khai | **Not yet created** | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| TR-ward-001 | Ward initialization from saved souls count + day penalties | ❌ No ADR — **BLOCKED** |

> ⚠️ **Warning**: Danh sách story for this epic will be marked Blocked until ADR-0005 is created. Run `/architecture_decision` to create the ADR, then proceed.

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/health-stamina-damage-rules.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

1. Run `/architecture_decision` to create ADR-0005 (Bộ đếm ward Triển khai)
2. Then run `/create-stories ward-timer` to break this epic into implementable stories