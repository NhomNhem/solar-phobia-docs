---
title: 'Design Directory'
description: 'Bản dịch tiếng Việt cho Design Directory.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

When authoring or editing files in this directory, follow these standards.

## GDD Files (`design/gdd/`)

Every GDD phải include all **8 required sections** in this order:
1. Tổng quan — one-paragraph summary
2. Player Fantasy — intended feeling and experience
3. Detailed Rules — unambiguous mechanics
4. Formulas — all math defined with variables
5. Edge Cases — unusual situations handled
6. Dependencies — other hệ thống listed
7. Tuning Knobs — configurable values identified
8. Tiêu chí chấp nhận — testable success conditions

**File naming:** `[hệ thống-slug].md` (e.g. `di chuyển-hệ thống.md`, `combat-hệ thống.md`)

**Systems index:** `design/gdd/hệ thống-index.md` — update when adding a new GDD.

**Design order:** Foundation → Lõi → Feature → Presentation → Polish

**Validation:** Run `/design-review [path]` after authoring any GDD.
Run `/review-all-gdds` after completing a set of related GDDs.

## Quick Specs (`design/quick-specs/`)

Lightweight specs for tuning changes, minor mechanics, or balance adjustments.
Use `/quick-design` to author.

## UX Specs (`design/ux/`)

- Per-screen specs: `design/ux/[screen-name].md`
- HUD design: `design/ux/hud.md`
- Interaction pattern library: `design/ux/tương tác-patterns.md`
- Accessibility requirements: `design/ux/accessibility-requirements.md`

Use `/ux-design` to author. Validate with `/ux-review` before passing to `/team-ui`.
