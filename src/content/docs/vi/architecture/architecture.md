---
title: Kiến trúc tổng thể Solar Phobia
description: Bản tóm tắt tiếng Việt về kiến trúc kỹ thuật của dự án Solar Phobia.
---

Solar Phobia dùng kiến trúc phân lớp rõ ràng cho Unity 6:

- **Domain** chứa luật lõi, entity, value object và quy tắc không phụ thuộc Unity.
- **Application** điều phối use case, service và state machine.
- **Infrastructure** kết nối dữ liệu, repository, package ngoài và hệ thống kỹ thuật.
- **Presentation** chứa UI, MonoBehaviour, scene-facing controller và feedback người chơi.
- **Composition** đăng ký dependency injection và nối các layer lại với nhau.

Luồng phụ thuộc đi theo một chiều:

```text
Domain -> Application -> Infrastructure / Presentation -> Composition
```

Mục tiêu của kiến trúc là giữ gameplay rule dễ test, giảm coupling với Unity scene, và cho phép thay đổi presentation mà không phá domain logic.

## Quy tắc chính

- Domain không tham chiếu Unity API.
- Application chỉ làm việc với interface và service contract.
- Infrastructure hiện thực repository, adapter và tích hợp package.
- Presentation chuyển input, UI và scene event thành command/use case.
- Composition là nơi duy nhất nối implementation cụ thể vào interface.

## ADR liên quan

Các quyết định kiến trúc chi tiết nằm trong nhóm ADR:

- ADR-0001: Phase State Machine Architecture
- ADR-0002: Soul Data Repository Pattern
- ADR-0003: Player Controller Pattern
- ADR-0004: Coding Standards and Scene Folder Structure
- ADR-0008: Night Survival Run Architecture

## Bản gốc

Bản tiếng Anh đầy đủ vẫn được giữ tại trang cùng mục trong ngôn ngữ English.
