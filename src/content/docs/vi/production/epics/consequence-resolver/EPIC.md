---
title: 'Epic: Bộ xử lý hậu quả'
description: 'Bản dịch tiếng Việt cho Epic: Bộ xử lý hậu quả.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Feature
> **GDD**: design/gdd/consequence-resolver.md
> **Module kiến trúc**: ConsequenceResolver (from architecture.md)
> **Trạng thái**: Ready
> **Danh sách story**: Not yet created — run `/create-stories consequence-resolver`

## Tổng quan

Bộ xử lý hậu quả is the moral arithmetic of Solar Phobia's night phase—it reads the abandoned soul from Day Service's lựa chọn payload and chuyển đổi that choice into a physical curse that hunts the player. The hệ thống owns the curse mapping logic, the NightOutcomeState write, and the xác định assignment that ensures "the person you left behind becomes your nightmare."

**Chủ đề**: "This is my fault" — The curse that hunts them at night is a direct manifestation of the person they abandoned. There's no randomness here; the water trap, blood net, or collapsing platform exists *because* you left that specific soul behind. The fantasy is ownership of horror.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| ADR-0007: Bộ xử lý hậu quả Pattern | Curse mapping from abandoned soul ID to NightOutcomeState (Drag, Block, FakeShrine) | MEDIUM |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| TR-consequence-001 | Curse payload generation from sacrifice | ADR-0007 ✅ |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/consequence-resolver.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories consequence-resolver` to break this epic into implementable stories.