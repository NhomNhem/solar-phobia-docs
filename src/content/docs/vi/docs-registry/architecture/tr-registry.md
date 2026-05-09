---
title: Traceability Registry
description: Tóm tắt tiếng Việt cho registry liên kết yêu cầu, thiết kế và triển khai.
---

Traceability Registry dùng để nối các yêu cầu thiết kế, ADR, epic/story và bằng chứng kiểm thử.

## Mục đích

- Theo dõi một yêu cầu bắt nguồn từ GDD nào.
- Biết ADR nào đang chi phối quyết định kỹ thuật.
- Tìm epic/story triển khai yêu cầu đó.
- Gắn QA evidence hoặc smoke test để chứng minh yêu cầu đã được kiểm tra.

## Cách đọc

Mỗi entry thường biểu diễn một requirement hoặc technical record. Khi thay đổi thiết kế hoặc code, cần cập nhật entry liên quan để production, design và engineering không bị lệch nhau.

## Ghi chú

Bản YAML gốc vẫn được giữ trong repo và được hiển thị trong docs English. Trang tiếng Việt này là bản hướng dẫn đọc nhanh.
