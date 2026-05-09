---
title: 'Manual Walkthrough: Cursor Visibility — Phase-Driven Show/Hide'
description: 'Bản dịch tiếng Việt cho Manual Walkthrough: Cursor Visibility — Phase-Driven Show/Hide.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Story**: production/epics/player-controller/story-006-cursor-visibility.md
> **TR-ID**: TR-player-007
> **Loại**: UI — Manual Walkthrough
> **Trạng thái**: [ ] Not yet verified

---

## Prerequisites

- Unity Editor open with a test scene containing:
  - A `PlayerController` MonoBehaviour wired to `CursorController`
  - `PhaseStateMachine` running and accessible
- Game is in Play mode

---

## Test Steps

### AC-1: Dịch vụ ban ngày shows cursor

1. Start Play mode — game initialises in `Dịch vụ ban ngày` phase
2. **Observe**: OS cursor is **visible** on screen
3. **Observe**: Mouse cursor can hover over and click UI elements (NPC cards, buttons)
4. **Verify**: `Cursor.lockState == CursorLockMode.None` (cursor moves freely)

**Expected**: ✅ Cursor visible, free di chuyển, UI clickable
**Result**: [ ] Pass  [ ] Fail
**Notes**:

---

### AC-2: Sinh tồn ban đêm hides cursor

1. Advance game to `Sinh tồn ban đêm` phase (via normal game flow or debug shortcut)
2. **Observe**: OS cursor **disappears** from screen
3. **Observe**: Moving the mouse rotates the camera (mouselook đang hoạt động)
4. **Verify**: `Cursor.lockState == CursorLockMode.Locked`

**Expected**: ✅ Cursor hidden, mouse controls camera look
**Result**: [ ] Pass  [ ] Fail
**Notes**:

---

### AC-3: Khóa lựa chọn / EndingEvaluation restores cursor

1. From `Sinh tồn ban đêm`, advance to `EndingEvaluation` phase
2. **Observe**: OS cursor **reappears** on screen
3. **Observe**: Cursor can interact with outcome prompts / UI
4. **Verify**: `Cursor.lockState == CursorLockMode.None`

**Expected**: ✅ Cursor visible, UI accessible
**Result**: [ ] Pass  [ ] Fail
**Notes**:

---

### AC-4: Synchronous — no frame delay

1. Trigger a phase transition (e.g. Dịch vụ ban ngày → Sinh tồn ban đêm)
2. **Observe**: Cursor trạng thái changes **in the same frame** as the phase change
3. There phải be no visible "flash" of cursor before it hides

**Expected**: ✅ Instant cursor hide on Sinh tồn ban đêm entry
**Result**: [ ] Pass  [ ] Fail
**Notes**:

---

### Edge Case: Alt+Tab during Sinh tồn ban đêm

1. While in `Sinh tồn ban đêm`, press Alt+Tab to switch away from the game window
2. Return focus to the game window
3. **Observe**: Cursor re-hides and mouselook resumes

**Expected**: ✅ Cursor re-locked on focus return
**Result**: [ ] Pass  [ ] Fail
**Notes**:

---

## Sign-off

| Field | Value |
|-------|-------|
| Tester | |
| Ngày | |
| Build | |
| Verdict | [ ] PASS  [ ] FAIL  [ ] PASS WITH NOTES |
| Notes | |
