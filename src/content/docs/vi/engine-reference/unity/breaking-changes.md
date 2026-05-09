---
title: 'Unity 6 — Thay đổi gây ảnh hưởng'
description: 'Bản dịch tiếng Việt cho Unity 6 — Thay đổi gây ảnh hưởng.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> Last verified: 2026-05-07

This document lists breaking changes from Unity 2022 LTS through Unity 6000.3.x that may affect this project.

---

## HIGH Rủi ro Changes (phải address)

### Object.FindObjectsOfType / FindObjectOfType — OBSOLETE

**Trạng thái**: Obsolete in Unity 6.0+

**Old API**:
```csharp
var objects = FindObjectsOfType<GameObject>();
var obj = FindObjectOfType<PlayerController>();
```

**Replacement**: Use `Object.FindObjectsByType` with `FindObjectsSortMode.None`:
```csharp
var objects = Object.FindObjectsByType<GameObject>(FindObjectsSortMode.None);
var obj = Object.FindObjectOfType<PlayerController>();
```

**Rủi ro**: Legacy code using old APIs will break compilation.

---

### Enlighten Baked Global Illumination — REMOVED

**Trạng thái**: Removed in Unity 6.0

**Impact**: If project uses Enlighten for GI, phải switch to another solution (e.g., URP/HDRP Progressive GPU).

**Recommendation**: For this project, use URP with realtime GI or lightprobes.

---

### Auto-Generated Lighting — REMOVED

**Trạng thái**: Removed in Unity 6.0

**Impact**: Projects relying on automatic lighting generation need explicit LightingSettings.

---

### Universal Compatibility Mode — REMOVED

**Trạng thái**: Removed in Unity 6.3 LTS

**Impact**: Projects using Universal Compatibility Mode phải migrate to standard rendering.

---

## MEDIUM Rủi ro Changes (be aware)

### UI Toolkit Event Handling — REORGANIZED

**Trạng thái**: Changed in Unity 6.0+

**Impact**: Custom UXML controls may need event handler updates.

**Tham chiếu**: `docs/engine-reference/unity/module/ui-toolkit.md`

---

### [SerializeField] — Stricter Validation

**Trạng thái**: Changed in Unity 6.3+

**Impact**: `[SerializeField]` can now only be applied to fields. Applying to properties/methods is compile error.

---

### Android UnityPlayer Class — Renamed

**Trạng thái**: Changed in Unity 6.0+

**Old**: `UnityPlayer` extends `FrameLayout`  
**New**: Use `UnityPlayerForActivityOrService` or `UnityPlayerForApplication`

---

### LightingSettings Gaussian Filter — Floating Point

**Trạng thái**: Changed in Unity 6.0+

**Old**: Integer radius values  
**New**: Floating point radius values

---

## LOW Rủi ro Changes (cosmetic/niche)

- Graphics formats: `DepthAuto`, `ShadowAuto`, `VideoAuto` obsolete
- Mipmap Limits no longer affect runtime Textures by default
- Package Manager: `UPM_CACHE_PATH` env vars no longer supported
- Light probes: ambient probe and skybox reflection probe no longer baked by default

---

## Cross-Tham chiếu

- See `deprecated-apis.md` for APIs to avoid
- See `current-best-practices.md` for recommended alternatives
- See `module/ui-toolkit.md` for UI Toolkit migration details