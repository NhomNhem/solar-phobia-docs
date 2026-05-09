---
title: 'Art Brief — Player Character Sprite'
---

## ASSET-001 (Day) & ASSET-002 (Night)

**Project**: Solar Phobia: Nắng Gắt  
**System**: Core Loop — Player Controller  
**Asset ID**: ASSET-001 (Day), ASSET-002 (Night)  
**Style**: 2D Hand-painted Watercolour  
**Engine**: Unity 6 (URP 2D)  
**Created**: 2026-05-07

---

## 1. Character Overview

### Name & Role
- **Character**: Tú — The survivor (protagonist)
- **Role**: Player-controlled character during day/night cycle
- **Fantasy**: A fisherman haunted by his choice to abandon a soul to the whale god

### Visual Identity
Tú appears as a **surviving mark** on the watercolour canvas — the stroke that didn't burn. He represents the player's agency in a world being consumed by fire.

---

## 2. Appearance Description

### Physical Build
| Element | Day Version | Night Version |
|---------|-------------|----------------|
| **Height** | ~1.8m (world units) | Same |
| **Build** | Slightly gaunt, lean from survival | More emaciated, ribs more visible |
| **Posture** | Upright but tired — carrying weight | Hunched, darting — constant vigilance |
| **Silhouette** | Compact, legible at thumbnail | Same form but frayed edges |

### Face & Head
- **No facial features** — only a darker brushstroke "mask" where a face would be
- The mask is not a void — it has texture, like dried ink
- Hair: Short, disheveled, sticking to forehead (sweat/sea spray)
- Color: Dark brown/black, desaturated in night

### Clothing (Vietnamese Fisherman)
| Layer | Day Description | Night Description |
|-------|-----------------|-------------------|
| **Top** | Loose woven shirt (áo bạc), cream/bone white, rolled sleeves. Faded patterns — former vibrancy now dead. Sun-bleached. | Shirt now torn at collar, edges charred. More visible skin underneath. |
| **Pants** | Simple dark trousers (quần), rolled to knees. Mud/stain marks at hem. | Same trousers but now soaked, darker — water and fear |
| **Shoes/Feet** | Barefoot (traditional fisherman). Calloused soles visible. | Feet dirty, minor cuts visible — running through debris |
| **Accessories** | None — he fled with nothing | Same |

### Wear & Damage (Survival Hints)
- **Day**: Clothes are worn but intact — fatigue, not destruction. Faded indigo dye shows his village origins. A small patch stitched on the left sleeve (self-repair).
- **Night**: Clothes show strain — shirt untucked, one sleeve rolled up (for sprinting). The "burn" begins at edges — char creeping inward.

### Expression (Without Face)
Body language communicates everything:
- **Day**: Shoulders slightly forward (burden), hands often clasped or fidgeting (guilt)
- **Night**: Jerky movements, sudden stops, coiled ready-to-run stance

---

## 3. Color Analysis

### Palette Comparison

| Color Element | Day (ASSET-001) | Night (ASSET-002) |
|--------------|----------------|-------------------|
| **Primary Fill** | Ochre Gold `#B8860B` → `#DAA520` | Desaturated to Charcoal `#2D2D2D` → `#1A1A1A` |
| **Skin Tone** | Warm undertone, terracotta `#CD853F` | Paler, slightly gray undertone `#A08060` |
| **Cloth Base** | Cream/bone `#F5F0E6` | Dark gray `#404040` |
| **Cloth Shadow** | Warm sepia `#8B7355` | Cold charcoal `#252525` |
| **Edge Treatment** | Soft, wet-edge bleed | Frayed, dry-brush crackle |
| **Outline** | Near-black ink `#1A1A1A` | Ember orange burn `#FF6B35` bleeding from outline |
| **Highlight** | Warm gold glow (subtle) | Ember edge glow (intense) |

### Lighting Direction
- **Day**: Global warm light (golden hour) — light from upper-left
- **Night**: No ambient light — only reflected fire/ember glow from below

### Psychological Color Mapping
| State | Color Message |
|-------|---------------|
| **Day** | "I am still human — there is warmth in me" |
| **Night** | "I am being consumed — the fire is winning" |

---

## 4. Technical Specifications

### File Requirements

| Parameter | Day Sprite | Night Sprite |
|-----------|-----------|---------------|
| **Canvas Size** | 1024 × 2048 px (4K ready) | Same |
| **Resolution** | 300 DPI | Same |
| **Format** | PSD (Layered) | PSD (Layered) |
| **Color Mode** | RGB | RGB |

### Layer Structure (MANDATORY)

```
PLAYER_SPRITE_DAY.psd
├── [Folder] BACKGROUND
│   └── (transparent)
├── [Folder] BODY_PARTS (for skeletal rig)
│   ├── L_foot
│   ├── L_calf
│   ├── L_thigh
│   ├── R_foot
│   ├── R_calf
│   ├── R_thigh
│   ├── L_hand
│   ├── L_forearm
│   ├── L_upperarm
│   ├── R_hand
│   ├── R_forearm
│   ├── R_upperarm
│   ├── Torso_lower (waist/hips)
│   ├── Torso_upper (chest)
│   ├── Head_mask
│   └── Neck
├── [Folder] CLOTHING
│   ├── Shirt_L_sleeve
│   ├── Shirt_R_sleeve
│   ├── Shirt_body
│   ├── Pants_L_leg
│   ├── Pants_R_leg
│   └── Pants_waist
├── [Folder] DETAILS (wear marks, stains, patches)
│   ├── Patch_left_sleeve
│   ├── Stain_hem
│   └── Mud_prints
├── [Folder] OUTLINE
│   └── (ink line layer)
└── [Folder] HIGHLIGHTS
    └── (soft glow layer)
```

### Unity Import Requirements
- **Skeleton**: Unity 2D Animation package compatible
- **Pivot**: Center-bottom (feet at Y=0)
- **Sprite Editor**: Slice by grid, assign to skeleton bones
- **Import Settings**: 
  - Texture Type: Sprite (2D and UI)
  - Sprite Mode: Multiple
  - Pixels Per Unit: 100 (for 1m = 100px)

### Animation States Required
| State | Frames | Notes |
|-------|--------|-------|
| Idle | 4 | Subtle breathing, slight sway |
| Walk | 8 | Measured pace, day |
| Run | 8 | Quicker, night-appropriate |
| Sprint | 8 | Arms pumping, heavy breath |
| Crouch/Cover | 4 | Enter/exit cover |
| Hit/Strike | 6 | Knockback reaction |
| Death | 8 | Fade to ash |

---

## 5. Art Bible Anchors

This asset directly serves:

| Rule | Application |
|------|-------------|
| **§1 Tactile Deliberation** | Visible brushstroke texture on cloth — hand-touched, not digital |
| **§1 Heat and Void** | Day = ochre warmth, Night = burned void |
| **§3 Character Silhouette** | Compact, legible, elongated (longer torso, shorter limbs) — fragile not powerful |
| **§3 Hero vs Support** | Player is "what remains whole" — most intact form in fragmented world |
| **§5 Player Character** | "Dense warm brushstroke that persists" — dense pigment, warm colors |
| **§4 Color: Ember edges** | Night sprite bleeds ember orange from outline |

---

## 6. Reference Images (For Artist)

### Mood
- **Day**:Warm golden hour, tender melancholy, visible brushstroke texture
- **Night**: Fire-damage aesthetic, ember glow, charred edges

### Reference Games
- *Candle: The Power of the Flame* — watercolour technique
- *Gris* — emotional color shifts, soft edge treatment
- *Hollow Knight* — silhouette readability

### Do
- Show wear/damage through texture, not holes
- Keep silhouette readable at 64px height
- Make brush direction visible in stroke

### Don't
- Add facial features (eyes, nose, mouth) — never
- Use clean/polished edges in night version
- Create hard black outlines — use ink-wash edges
- Make character look strong/powerful — he's surviving, not fighting

---

## 7. Delivery Checklist

- [ ] PSD file (layered, 1024×2048)
- [ ] All body parts on separate layers
- [ ] Cloth layers separate from body
- [ ] Outline layer for silhouette editing
- [ ] Day version with warm palette
- [ ] Night version with burned edges
- [ ] 8-frame walk cycle (optional, for later)
- [ ] 8-frame run cycle (optional, for later)

---

## 8. Contact & Notes

**Art Director**: [To be assigned]  
**Game Designer**: Player Controller GDD specifies movement mechanics  
**Technical Artist**: Unity 2D Animation skeleton requirement

> **Note**: The character must work as a "painted mark" — visible brushstroke, pigment texture, paper grain showing through. This is not clean vector art. Rough edges are intentional.

---

*End of Art Brief — Player Sprite (Day/Night)*