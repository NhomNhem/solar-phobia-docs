---
title: 'Epic: Module hiệu ứng nguyền rủa'
description: 'Bản dịch tiếng Việt cho Epic: Module hiệu ứng nguyền rủa.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Feature
> **GDD**: design/gdd/curse-effect-module.md
> **Module kiến trúc**: CurseEffectManager (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories curse-effect-module`

## Tổng quan

Module hiệu ứng nguyền rủa control the karma-based hazards that spawn during Phase ban đêm based on which soul was abandoned during Phase ban ngày. Each curse (Drag/Block/FakeShrine) manifests as specific environmental hazards with unique visual and audio signatures.

**Chủ đề**: "Haunted specificity" — Not generic danger, but *this particular* horror because of *this particular* choice. The water trap feels like Linh's drowning. The blood net feels like Van's capture. The illusion platform feels like Minh's betrayal. The horror is personal and deserved.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| (None) | No ADR exists for this hệ thống | — |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| (None tracked) | Three curse types (Drag, Block, FakeShrine), hazard spawning, visual/audio signatures | — |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/curse-effect-module.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories curse-effect-module` to break this epic into implementable stories.