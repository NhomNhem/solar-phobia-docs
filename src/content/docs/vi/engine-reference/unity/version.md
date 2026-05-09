---
title: Tham chiếu phiên bản Unity
description: Ghi chú tiếng Việt về phiên bản Unity đang dùng trong Solar Phobia.
---

Dự án dùng **Unity 6000.3.11f1**.

Đây là Unity 6, nên khi làm việc với API mới hoặc khu vực rủi ro cao cần kiểm tra tài liệu engine trong repo trước khi sửa code.

## Khu vực cần chú ý

- **UI Toolkit**: kiểm tra thay đổi API, layout và runtime/editor differences.
- **VContainer source generation**: field dùng `[Inject]` cần là `internal`, không dùng `private`.
- **R3 reactive patterns**: dùng `ReactiveProperty<T>`, dispose subscription rõ ràng.
- **API obsolete**: tránh `FindObjectOfType<T>()`; dùng `FindFirstObjectByType<T>()` hoặc `FindObjectsByType<T>()`.

## Tài liệu liên quan

- Breaking changes
- Deprecated APIs
- Current best practices
- UI Toolkit module reference

## Quy tắc thực hành

Khi viết code Unity 6 trong vùng rủi ro cao, đọc engine reference trước, sau đó mới chỉnh implementation.
