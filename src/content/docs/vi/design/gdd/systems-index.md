---
title: Chỉ mục hệ thống thiết kế
description: Tổng quan tiếng Việt về các GDD và hệ thống gameplay của Solar Phobia.
---

Trang này gom các hệ thống thiết kế chính của Solar Phobia để team có thể tra cứu nhanh.

## Nhóm hệ thống lõi

- **Game State / Phase State Machine**: điều phối vòng ngày và đêm, khóa/mở input theo phase, và phát event cho các hệ thống khác.
- **NPC / Soul Data Model**: định nghĩa linh hồn, trạng thái cứu/bỏ rơi, dữ liệu cảm xúc và hậu quả.
- **Day Service & Selection**: xử lý phase ban ngày, chọn linh hồn, hoán đổi và đẩy vị trí.
- **Night Survival Run**: phase chạy sinh tồn ban đêm, ward timer, boss searchlight và mục tiêu shrine.
- **Player Controller**: di chuyển, dash, glide, tương tác, cover detection và phase-gated input.

## Nhóm hệ thống nguy cơ

- **Map & Spawn Director**: sinh route, cover, relic, hazard và kiểm tra độ công bằng.
- **Shadow Spatial Management**: quản lý vùng bóng râm, cover, exposure và feedback.
- **Boss Cá Ông Searchlight**: sweep, telegraph, strike và penalty khi người chơi bị lộ.
- **Curse Effect Modules**: hậu quả từ linh hồn bị bỏ rơi, curse và hazard phụ.

## Nhóm feedback và mục tiêu

- **Health / Stamina / Damage Rules**: tài nguyên, penalty và ràng buộc sống sót.
- **Sensory Feedback System**: âm thanh, hình ảnh và cảm giác báo nguy.
- **Shrine Objective & Win/Lose Rules**: điều kiện thắng/thua và mục tiêu cuối run.
- **Tactile Rituals**: cảm giác thao tác nghi lễ trong phase ban ngày.

## Cách dùng

Dùng chỉ mục này để tìm GDD chủ quản trước khi sửa code, viết story hoặc cập nhật asset spec. Nếu một thay đổi ảnh hưởng nhiều hệ thống, cần kiểm tra GDD liên quan và ADR tương ứng.
