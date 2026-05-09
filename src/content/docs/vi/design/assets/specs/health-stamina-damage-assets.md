---
title: 'Đặc tả asset — System: Máu/thể lực & Luật sát thương'
description: 'Bản dịch tiếng Việt cho Đặc tả asset — System: Máu/thể lực & Luật sát thương.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Source**: design/gdd/health-stamina-damage-rules.md
> **Art Bible**: design/art/art-bible.md
> **Generated**: 2026-05-07
> **Trạng thái**: 9 assets specced

---

## ASSET-012 — Bộ đếm ward Widget (Day)

| Field | Value |
|-------|-------|
| Category | UI |
| Dimensions | 200×40px |
| Format | PNG with transparency |
| Naming | `ward_timer_day.png` |

**Visual Description**:  
A horizontal bar at top-center showing time remaining. Day: Ochre Gold fill with soft watercolor edges. The bar feels like a "golden hour" timer — warmth that costs something. No numbers visible in sprite — numbers render as text overlay.

**Art Bible Anchors**:
- §4 Color: Ochre Gold = cost of time, weighted, not celebratory
- §7 UI: Soft rounded containers, wet-edge blur

**Generation Prompt**:  
"Horizontal bar UI element, watercolour style, ochre gold fill with soft bleeding edges, clean container, game HUD element, top of screen position"

---

## ASSET-013 — Bộ đếm ward Widget (Night)

| Field | Value |
|-------|-------|
| Category | UI |
| Dimensions | 200×40px |
| Format | PNG with transparency |
| Naming | `ward_timer_night.png` |

**Visual Description**:  
Same bar form but now ember-orange with pulsing glow — the timer is dying, burning out. The edges are cracked/singed rather than soft. Visual urgency.

**Art Bible Anchors**:
- §4 Color: Ember Orange = đang hoạt động danger, dying glow
- §7 UI: Sharp cracked edges, heat shimmer at night

**Generation Prompt**:  
"Horizontal bar UI element, watercolour style, ember orange pulsing glow, cracked/singed edges, dying/burning effect, game HUD element"

---

## ASSET-014 — Tier 2 Vignette (Creeping Dread)

| Field | Value |
|-------|-------|
| Category | VFX / Screen Effect |
| Dimensions | Full-screen (3840×2160) |
| Format | PNG with transparency |
| Naming | `vignette_tier2.png` |

**Visual Description**:  
A full-screen vignette with α=0.3 (soft dark edges). The vignette feels like shadows pooling at the corners — watercolor wash, not hard lines. Subtle, creeping dread, not alarming.

**Art Bible Anchors**:
- §4 Color: Charcoal edges bleeding inward
- §2 Mood: "Tightening" atmosphere at ≤75% Ward

**Generation Prompt**:  
"Full screen vignette overlay, soft dark edges with 30% opacity, watercolour wash effect bleeding from corners, subtle not alarming, game screen effect"

---

## ASSET-015 — Tier 3 Heavy Burden Overlay

| Field | Value |
|-------|-------|
| Category | VFX / Screen Effect |
| Dimensions | Full-screen (3840×2160) |
| Format | PNG with transparency |
| Naming | `overlay_tier3.png` |

**Visual Description**:  
Heavier vignette (α ~0.5), darker, more oppressive. The screen feels "weighted" — like looking through watercolour that's too thick. Slight desaturation effect.

**Art Bible Anchors**:
- §4 Color: Palette narrowing at transition
- §2 Mood: "Heavy burden" — visual weight increases

**Generation Prompt**:  
"Full screen overlay, heavier vignette 50% opacity, oppressive dark edges, watercolour wash texture, subtle desaturation, game screen effect"

---

## ASSET-016 — Tier 4 Panic Effect (Chromatic Aberration)

| Field | Value |
|-------|-------|
| Category | VFX / Screen Effect |
| Dimensions | Full-screen (3840×2160) × 3 (RGB offset) |
| Format | PNG sequence |
| Naming | `panic_chromatic_*.png` |

**Visual Description**:  
Chromatic aberration — RGB channels offset, creating color fringing and visual distortion. The screen "breaks" like wet paint separating. This effect has 30-second cap per GDD.

**Art Bible Anchors**:
- §2 Mood: "Panic" — chaotic, fractured
- §3 Shape: Fractured, fragmented, stripped

**Generation Prompt**:  
"Chromatic aberration effect for game screen, RGB color fringing offset, watercolour paint separating effect, chaotic broken feel, game panic trạng thái"

---

## ASSET-017 — Tier 5 Death Spiral (Tunnel Vision)

| Field | Value |
|-------|-------|
| Category | VFX / Screen Effect |
| Dimensions | Full-screen (3840×2160) |
| Format | PNG with transparency |
| Naming | `death_spiral_tunnel.png` |

**Visual Description**:  
Tunnel vision — edges go completely dark (Canvas Cream / bare paper), center remains visible but fades. Total consumption approaching. The world is being erased.

**Art Bible Anchors**:
- §2 Mood: "Hoàn tất erasure — not pain, but absence"
- §4 Color: Canvas Cream = bare paper, absence

**Generation Prompt**:  
"Tunnel vision effect, edges fading to bare paper/off-white, center view collapsing, erasure/death approach, game final trạng thái"

---

## ASSET-018 — Tier 4 Whispers Audio Visual

| Field | Value |
|-------|-------|
| Category | VFX / Particle |
| Dimensions | 64×64px (spawnable) |
| Format | PNG with transparency |
| Naming | `whisper_particle.png` |

**Visual Description**:  
Small, ephemeral particles that appear around the player at Tier 4. Like faint brushstrokes that appear and fade quickly. Subtle — more implied than visible.

**Art Bible Anchors**:
- §2 Mood: "Whispering audio" at panic trạng thái
- §3 Shape: Fragmented, fleeting

**Generation Prompt**:  
"Small ephemeral particle, faint brushstroke appearance, subtle fading effect, whispers, game audio visualization"

---

## ASSET-019 — Critical Ward Warning

| Field | Value |
|-------|-------|
| Category | UI |
| Dimensions | 128×128px |
| Format | PNG with transparency |
| Naming | `critical_warning.png` |

**Visual Description**:  
A pulsing warning indicator that appears when Ward hits ≤25% (Tier 4) or ≤10s (Tier 5). Ember Orange with urgent pulse. Uses jagged shape (colorblind backup per art bible).

**Art Bible Anchors**:
- §4 Colorblind: Sharp triangular silhouette backup for Ember/danger
- §3 Shape: Sharp, angular at danger trạng thái

**Generation Prompt**:  
"Urgent warning icon, pulsing ember orange, jagged triangular shape, danger indicator, game critical trạng thái"

---

## Audio Assets (Descriptions Only)

| Asset | Description | Trigger |
|-------|-------------|---------|
| Low-pass audio filter | Sounds become muffled, distant | Tier 2 (≤75%) |
| Heavy breathing | Player's breath becomes audible, labored | Tier 3 (≤50%) |
| Whispering audio | Distant voices, hallucinations | Tier 4 (≤25%) |
| Tinnitus | High-pitched ringing | Tier 5 (≤10s) |

---

## Summary

| Asset ID | Name | Category | Trạng thái |
|----------|------|----------|--------|
| ASSET-012 | Bộ đếm ward Widget (Day) | UI | Needed |
| ASSET-013 | Bộ đếm ward Widget (Night) | UI | Needed |
| ASSET-014 | Tier 2 Vignette | VFX | Needed |
| ASSET-015 | Tier 3 Heavy Burden | VFX | Needed |
| ASSET-016 | Tier 4 Panic Chromatic | VFX | Needed |
| ASSET-017 | Tier 5 Death Spiral | VFX | Needed |
| ASSET-018 | Tier 4 Whisper Particles | VFX | Needed |
| ASSET-019 | Critical Warning | UI | Needed |

---

*End of Máu/thể lực Đặc tả asset*