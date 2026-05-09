---
title: 'Playtest Report'
description: 'Bản dịch tiếng Việt cho Playtest Report.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Trạng thái**: Ready for session
> **Purpose**: Validate core loop and identify critical issues before Polish phase

---

## Session Info

- **Ngày**: _________________
- **Build**: _________________ (commit/date)
- **Duration**: _________________
- **Tester**: _________________
- **Platform**: [ ] PC  [ ] Mac  [ ] Other: _______
- **Input Method**: [ ] KB+M  [ ] Gamepad
- **Session Loại**: [ ] First time  [ ] Returning  [ ] Targeted test

---

## Test Focus Areas

Based on MVP GDDs, prioritize testing these core hệ thống:

| Độ ưu tiên | System | GDD Tham chiếu |
|----------|--------|----------------|
| 1 | Máy trạng thái phase (Day → Choice → Night) | `game-trạng thái-phase-trạng thái-machine.md` |
| 2 | Day Service & Selection (who to save) | `day-service-and-lựa chọn.md` |
| 3 | Chạy sinh tồn ban đêm (consequences) | `night-survival-run.md` |
| 4 | Bộ điều khiển người chơi & Skills | `player-controller.md` |
| 5 | Bộ đếm ward / Nước Mắm Cốt | `health-stamina-damage-rules.md` |
| 6 | Sensory Feedback (HUD-less) | `sensory-feedback-hệ thống.md` |

---

## First Impressions (First 5 minutes)

- **Understood the goal?** [ ] Yes [ ] Partially [ ] No
- **Understood the controls?** [ ] Yes [ ] Partially [ ] No  
- **Emotional response**: [ ] Engaged [ ] Confused [ ] Bored [ ] Frustrated [ ] Excited
- **Notes**: _________________________________________________

---

## Lõi Loop Test

### Phase ban ngày
- [ ] Spawned into day phase correctly
- [ ] Understood objective (move souls to shadow, avoid sun)
- [ ] Controls felt responsive
- [ ] Sensory feedback was clear (danger cues)

### Choice Phase
- [ ] Understood a choice was required
- [ ] Could identify which soul to save
- [ ] Selection UI was clear

### Phase ban đêm
- [ ] Transition to night was clear
- [ ] Understood new objective (reach shrine)
- [ ] Hệ quả from choice were apparent
- [ ] Hazards were fair but challenging

### Win/Lose
- [ ] Win condition (reach shrine) worked
- [ ] Lose condition (timer/catch) worked
- [ ] End trạng thái was satisfying

---

## Gameplay Flow

### What worked well
- _________________________________________________
- _________________________________________________

### Pain points
- _________________________________________________ [ ] High [ ] Medium [ ] Low
- _________________________________________________ [ ] High [ ] Medium [ ] Low

### Confusion points
- _________________________________________________
- _________________________________________________

### Moments of delight
- _________________________________________________
- _________________________________________________

---

## Feature-Specific Feedback

### Máy trạng thái phase
- **Transitions clear?** [ ] Yes [ ] No
- **Issues**: _________________________________________________

### Day Selection
- **Quyết định understandable?** [ ] Yes [ ] No
- **Stakes felt real?** [ ] Yes [ ] No

### Night Survival
- **Difficulty**: [ ] Too Easy [ ] Just Right [ ] Too Hard
- **Pacing**: [ ] Too Slow [ ] Good [ ] Too Fast

### Sensory Feedback (HUD-less)
- **Timer urgency clear?** [ ] Yes [ ] No [ ] N/A
- **Danger readable?** [ ] Yes [ ] No
- **Needed UI elements**: _________________________________________________

---

## Bugs Encountered

| # | Description | Severity | Reproducible |
|---|-------------|----------|---------------|
| 1 | _________________________________ | [H][M][L] | [ ] Yes |
| 2 | _________________________________ | [H][M][L] | [ ] Yes |
| 3 | _________________________________ | [H][M][L] | [ ] Yes |

---

## Quantitative Data

- **Deaths**: ____ 
- **Time in day phase**: ____ min
- **Time in night phase**: ____ min
- **Souls saved**: ____ / ____
- **Features discovered**: _________________________________________________
- **Features missed**: _________________________________________________

---

## Overall Assessment

- **Would play again?** [ ] Yes [ ] No [ ] Maybe
- **Difficulty**: [ ] Too Easy [ ] Just Right [ ] Too Hard
- **Pacing**: [ ] Too Slow [ ] Good [ ] Too Fast
- **Session length preference**: [ ] Shorter [ ] Good [ ] Longer

---

## Top 3 Priorities from this session

1. _________________________________________________
2. _________________________________________________
3. _________________________________________________

---

## GDD Verification

Check if gameplay matches design intent from GDDs:

| GDD | Matches? | Notes |
|-----|----------|-------|
| `game-trạng thái-phase-trạng thái-machine.md` | [ ] Yes [ ] No | |
| `day-service-and-lựa chọn.md` | [ ] Yes [ ] No | |
| `night-survival-run.md` | [ ] Yes [ ] No | |
| `player-controller.md` | [ ] Yes [ ] No | |
| `health-stamina-damage-rules.md` | [ ] Yes [ ] No | |
| `sensory-feedback-hệ thống.md` | [ ] Yes [ ] No | |

---

## Readiness for Polish

**Blockers found?** [ ] Yes (list below) [ ] No

- _________________________________________________

**Verdict**: [ ] Ready for Polish  [ ] Needs fixes  [ ] Needs more testing