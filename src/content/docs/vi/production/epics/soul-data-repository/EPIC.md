---
title: 'Epic: Kho dữ liệu linh hồn'
description: 'Bản dịch tiếng Việt cho Epic: Kho dữ liệu linh hồn.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Layer**: Foundation
> **GDD**: design/gdd/npc-soul-data-model.md
> **Module kiến trúc**: SoulDataRepository (from architecture.md)
> **Trạng thái**: Hoàn tất
> **Danh sách story**: Not yet created — run `/create-stories soul-data-repository`

## Tổng quan

The Kho dữ liệu linh hồn is the canonical source of truth for every soul used in Solar Phobia's vòng lặp ngày/đêm. It defines identity, daily lựa chọn trạng thái, abandonment outcome, and persistent run-scoped metadata so Day Service, Bộ xử lý hậu quả, and downstream survival hệ thống consume consistent data contract.

**Chủ đề**: Clarity with guilt — "I know exactly who I left behind, and the night reflects that choice." When this model is working, players trust that outcomes are consistent and fair, which reinforces ownership rather than randomness.

## ADR chi phối

| ADR | Tóm tắt quyết định | Rủi ro engine |
|-----|-----------------|-------------|
| ADR-0002: Kho dữ liệu linh hồn Pattern | Dictionary-based O(1) lookup for soul entities with R3 observables for trạng thái changes | MEDIUM |

## Yêu cầu GDD

| TR-ID | Yêu cầu | ADR bao phủ |
|-------|-------------|--------------|
| TR-npc-001 | Soul entity storage with unique ID, lựa chọn trạng thái, and night outcome | ADR-0002 ✅ |

## Định nghĩa hoàn thành

Epic này hoàn tất khi:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/npc-soul-data-model.md` are verified
- All Logic and Integration stories have passing test files in `tests/`
- All Visual/Feel and UI stories have evidence docs with sign-off in `production/qa/evidence/`

## Bước tiếp theo

Run `/create-stories soul-data-repository` to break this epic into implementable stories.
## Danh sách story

| Story | Tiêu đề | Trạng thái |
|-------|-------|--------|
| story-001 | Soul Entity — Canonical Data Model | ✅ Hoàn tất |
| story-002 | Phase-Locked Writes | ✅ Hoàn tất |
| story-003 | Query API | ✅ Hoàn tất |

## Test Evidence

- Assets/_Project/Application/Repositories/SoulRepository.cs — full implementation
- Assets/_Project/Application/Editor/Tests/SoulRepositoryTests.cs — 16 tests, all passing
