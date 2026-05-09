---
title: Chỉ mục Epic sản xuất
description: Tổng quan tiếng Việt về backlog sản xuất của Solar Phobia.
---

Chỉ mục này tóm tắt các epic sản xuất đang dẫn dắt vertical slice của Solar Phobia.

## Epic gameplay lõi

- **Phase State Machine**: nền tảng điều phối ngày/đêm và event liên hệ giữa hệ thống.
- **Player Controller & Skills**: input theo phase, di chuyển, dash, glide, cover và tương tác.
- **Soul Data Repository**: dữ liệu linh hồn, truy vấn trạng thái và ghi dữ liệu an toàn theo phase.
- **Day Service & Selection**: thao tác linh hồn trong phase ban ngày.
- **Night Survival Run**: vòng chạy ban đêm, ward timer, shrine objective và điều kiện thua.

## Epic nguy cơ và phản hồi

- **Map & Spawn Director**: sinh map, cover, relic, route viability và searchlight strike.
- **Boss Cá Ông Searchlight**: hành vi sweep, telegraph và penalty.
- **Shadow Spatial Management**: vùng cover, exposure và quản lý không gian bóng.
- **Sensory Feedback System**: phản hồi nhìn/nghe/cảm giác theo mức nguy hiểm.
- **Curse Effect Modules**: hậu quả từ các lựa chọn ban ngày.

## Epic hỗ trợ

- **Ward Timer**: công thức thời gian sống sót và tác động từ relic.
- **Physical Crowding & Push**: va chạm/đẩy linh hồn.
- **Shrine Objective & Win/Lose Rules**: mục tiêu cuối và điều kiện kết thúc run.
- **Audio State Director**: chuyển trạng thái âm thanh theo phase và threat.
- **HUD-less Design**: giảm HUD, đẩy feedback vào thế giới game.

## Cách dùng

Mỗi epic chứa story chi tiết, acceptance criteria và liên kết đến ADR/GDD. Khi nhận việc, bắt đầu từ epic, sau đó mở story cụ thể để triển khai hoặc kiểm thử.
