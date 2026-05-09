---
title: 'Brief mỹ thuật — NPC: Van (Ink Stroke)'
description: 'Bản dịch tiếng Việt cho Brief mỹ thuật — NPC: Van (Ink Stroke).'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

## ASSET-043 (Base), ASSET-047 (Saved), ASSET-048 (Abandoned)

**Project**: Solar Phobia: Nắng Gắt  
**System**: Day Service & Selection — NPC Soul  
**Archetype**: Ink Stroke  
**Asset ID**: ASSET-043, ASSET-047, ASSET-048  
**Style**: 2D Hand-painted Watercolour

---

## 1. Character Tổng quan

| Attribute | Description |
|-----------|-------------|
| **Name** | Van — "Crowd/Multitude" |
| **Role** | One of three souls player phải choose to save/abandon |
| **Personality** | Bold, confident, reliable — the one you want to save |
| **Visual Archetype** | Ink stroke — sharp, angular, confident, single brushstroke |

### Van's Story
Van was a strong swimmer, a leader in the village. He tried to hold the rope against the whale but was dragged under. His form is the most solid of the three — he died trying to help others. He's the "obvious choice" to save, which makes the moral weight harder.

---

## 2. Appearance — Base State (ASSET-043)

### Physical Form
| Element | Description |
|---------|-------------|
| **Silhouette** | Geometric, squared shoulders, upright pose |
| **Form** | Single confident brushstroke — like one motion created him |
| **Presence** | Solid, defined — you can't miss him |
| **Height** | Slightly taller than player (~1.9m) |

### Head & Face
- No facial features — just a darker stroke where a face would be
- Strong jaw line suggested by stroke direction
- Hair: Short-cropped, neat (was a leader, took care of himself)

### Clothing
| Layer | Description |
|-------|-------------|
| **Top** | Simple vest/shirt, button-up style — Burnt Sienna (#8B4513) |
| **Pants** | Dark trousers, straight leg |
| **Feet** | Bare — working man's feet, calloused |

### Color Palette
| Element | Color Name | Hex Code |
|---------|-----------|----------|
| **Primary Stroke** | Burnt Sienna | `#8B4513` |
| **Shadow** | Dark Umber | `#5D3A1A` |
| **Highlight** | Warm Tan | `#CD853F` |
| **Outline** | Near-black ink | `#1A1A1A` |
| **Skin** | Warm brown | `#A0785A` |

### Texture & Technique
- Visible brush direction — horizontal strokes building form
- Strong, confident linework
- No blending/wet effects — crisp application
- Stroke ends are sharp, deliberate

---

## 3. Appearance — Saved State (ASSET-047)

When Van is saved, his confidence is rewarded.

### Changes from Base
| Change | Description |
|--------|-------------|
| **Brightness** | Colors intensify — Burnt Sienna → Rich Orange-Sienna |
| **Outline** | Warm gold rim glow appears (#FFD700) |
| **Form** | Even more solid — stroke feels "reinforced" |
| **Posture** | Broader shoulders, more upright |

### What Stays the Same
- Still the "ink stroke" — sharp, confident, geometric
- Still the most solid of the three
- Still reliable-looking

---

## 4. Appearance — Abandoned State (ASSET-048)

When Van is abandoned, his form fractures.

### Changes from Base
| Change | Description |
|--------|-------------|
| **Form** | Stroke splits into multiple branching lines — like a struck match |
| **Color** | Desaturates to gray-brown |
| **Shape** | Breaking apart — losing coherence |
| **Expression** | Fragmented, disintegrating |

### Visual Metaphor
Van was solid, reliable, unbreakable. But when abandoned, he realizes his strength wasn't enough. He breaks — not dissolves like Linh, but *shatters*.

---

## 5. Technical Specifications

### File Yêu cầu

| Parameter | Value |
|-----------|-------|
| **Canvas Size** | 512 × 512 px per portrait |
| **Resolution** | 300 DPI |
| **Format** | PNG with transparency (PSD source preferred) |
| **Sprite Loại** | Portrait — front-facing |

### Layer Structure

```
VAN_PORTRAIT.psd
├── [Folder] BODY
│   ├── Head_shape (angular)
│   ├── Torso (rectangular)
│   ├── Arms (straight strokes)
│   └── Legs
├── [Folder] CLOTHING
│   ├── Vest_shirt
│   └── Trousers
├── [Folder] STROKE_EFFECT
│   ├── Main_stroke
│   ├── Stroke_direction (brush marks)
│   └── Edge_detail
├── [Folder] STATE_VARIANT
│   ├── Warm_rim (Saved)
│   ├── Fracture_lines (Abandoned)
│   └── Branching_effect (Abandoned)
└── [Folder] HIGHLIGHTS
    └── Sharp_edge_highlight
```

### Animation States (If Needed)
| State | Frames | Notes |
|-------|--------|-------|
| Idle (Base) | 4 | Subtle confidence — slight di chuyển |
| Idle (Saved) | 4 | Strong, stable, warm pulse |
| Idle (Abandoned) | 4 | Shaking, breaking apart |

---

## 6. Art Bible Anchors

| Rule | Application |
|------|-------------|
| **§5 Character: Van** | "Ink stroke — sharp, angular, confident, Burnt Sienna" |
| **§3 Shape Language** | "Geometric, slightly elongated, upright pose with squared shoulders" |
| **§2 Mood: Dịch vụ ban ngày** | "Reliable, strong — the obvious choice" |
| **§4 Color: Sienna = Active** | Saved = brighter Sienna |
| **§5 Character: Night** | "Stroke splits into multiple branching lines" — Abandoned |

---

## 7. Do & Don't

| ✅ Do | ❌ Don't |
|-------|----------|
| Strong, geometric shapes | Rounded, blob-like forms |
| Clear brush direction visible | Blended, uncertain strokes |
| Solid, confident stroke | Faded, translucent wash |
| Bold Burnt Sienna palette | Blues/indigos (that's Linh) |
| Saved = brighter, more solid | Saved = different character |
| Abandoned = fracturing/breaking | Abandoned = fading (that's Linh) |

---

## 8. Tham chiếu

- **Art Style**: Calligraphy brush strokes, single-motion painting
- **Tham chiếu**: Chinese/Japanese ink painting (sumi-e), brush calligraphy
- **Similar Games**: Hollow Knight (bold silhouettes), ink-brush aesthetic

---

## 9. Delivery Checklist

- [ ] ASSET-043 — Van Portrait Base (512×512 PNG)
- [ ] ASSET-047 — Van Portrait Saved (warm glow)
- [ ] ASSET-048 — Van Portrait Abandoned (fracturing)
- [ ] Optional: Idle animation frames (4 per trạng thái)

---

*End of Brief mỹ thuật — Van (Ink Stroke)*