---
title: 'Epic: Chạy sinh tồn ban đêm'
description: 'Bản dịch tiếng Việt cho Epic: Chạy sinh tồn ban đêm.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Feature
> **GDD**: design/gdd/night-survival-run.md
> **Module kiến trúc**: NightSurvivalRun (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories night-survival-run`

## Tổng quan

Chạy sinh tồn ban đêm is the action phase of Solar Phobia's core loop—the frantic, timed run from StartShrine to EndShrine while the player's Bộ đếm ward counts down. During this phase, the player navigates a dark, hazardous map using di chuyển skills (sprint, dash, swing, glide) and cover mechanics while being pursued by the Cá Ông (whale) boss searchlight and haunted by karma hazards that spawn based on which soul was abandoned during Phase ban ngày.

**Chủ đề**: "Desperate hope" — Running at full speed toward the shrine with the timer counting down, knowing each second brings them closer to salvation but also closer to the whale's jaws.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| ADR-0008: Chạy sinh tồn ban đêm Architecture | **Not yet created** | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| TR-night-001 | Night loop with hazards, chase, objective timing | ❌ No ADR — **BLOCKED** |

> ⚠️ **Warning**: Danh sách story for this epic will be marked Blocked until ADR-0008 is created. Run `/architecture_decision` to create the ADR, then proceed.

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/night-survival-run.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

1. Run `/architecture_decision` to create ADR-0008 (Chạy sinh tồn ban đêm Architecture)
2. Then run `/create-stories night-survival-run` to break this epic into implementable stories