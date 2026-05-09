---
title: 'Epic: Audio State Director'
---

> **Layer**: Presentation
> **GDD**: design/gdd/audio-core-loop.md
> **Architecture Module**: AudioMixDirector (from architecture.md)
> **Status**: Ready
> **Stories**: Not yet created — run `/create-stories audio-state-director`

## Overview

Audio State Director controls the sonic identity of Solar Phobia's core loop. It manages day/night audio snapshots, phase-gated music transitions, and threat escalation cues. The audio should feel like "watercolour on paper" — organic, textured, intimate, sound ON the page not OF the world.

**Theme**: "Opposites in sound" — Day: warm, measured, contemplative (gentle waves on a quiet shore). Night: urgent, desperate, primal (being hunted by something ancient).

## Governing ADRs

| ADR | Decision Summary | Engine Risk |
|-----|-----------------|-------------|
| (None) | No ADR exists for this system | — |

## GDD Requirements

| TR-ID | Requirement | ADR Coverage |
|-------|-------------|--------------|
| (None tracked) | Day/night audio mix, phase snapshots, threat escalation cues, ambient layers | — |

## Definition of Done

This epic is complete when:
- All stories are implemented, reviewed, and closed via `/story-done`
- All acceptance criteria from `design/gdd/audio-core-loop.md` are verified
- All Visual/Feel stories have evidence docs with sign-off in `production/qa/evidence/`

## Next Step

Run `/create-stories audio-state-director` to break this epic into implementable stories.