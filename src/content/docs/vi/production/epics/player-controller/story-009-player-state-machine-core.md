---
title: 'Story 009: PlayerStateMachine Lõi — FSM Foundation'
description: 'Bản dịch tiếng Việt cho Story 009: PlayerStateMachine Lõi — FSM Foundation.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

> **Epic**: player-controller
> **Trạng thái**: Hoàn tất
> **Layer**: Lõi
> **Loại**: Logic
> **Độ ưu tiên**: P0
> **Estimate**: 4 hours
> **Manifest Phiên bản**: N/A

## Bối cảnh

**GDD**: `design/gdd/player-controller.md`
**TR-ID**: `TR-player-009`
**Yêu cầu**: Movement and skill trạng thái management during Night Survival
**ADR Governing Triển khai**: ADR-0003-v2: Bộ điều khiển người chơi Pattern (2D)

**Engine**: Unity 6000.3.11f1 (Unity 6) | **Rủi ro**: HIGH (R3 ReactiveProperty)

---

## Vấn đề cần giải quyết

Current player-controller implementation lacks a centralized Finite Máy trạng thái (FSM). Player trạng thái (Idle, Moving, Sprinting, etc.) are managed inconsistently across different scripts. This creates:
- No unified way to query current player trạng thái
- Difficulty enforcing trạng thái-based rules (e.g., can't dash while Exhausted)
- No clear trạng thái transition logic for skills and di chuyển

---

## Tiêu chí chấp nhận

- [x] `EPlayerState` enum defined: Idle, Moving, Sprinting, Jumping, Falling, Dashing, Swinging, Gliding, Interacting, Exhausted, Crouching
- [x] `ReactiveProperty<EPlayerState> CurrentState` exposed as `ReadOnlyReactiveProperty<EPlayerState>`
- [x] State transitions are xác định based on input + physics conditions
- [x] State changes emit `PlayerStateChangedEvent` for other hệ thống to subscribe
- [x] FSM is fully testable without Unity scene dependencies (pure C# logic)

---

## Ghi chú triển khai

*Derived from ADR-0003-v2 Triển khai Guidelines:*

```csharp
public enum EPlayerState {
    Idle,
    Moving,
    Sprinting,
    Jumping,
    Falling,
    Dashing,
    Swinging,
    Gliding,
    Interacting,
    Exhausted,
    Crouching
}

public interface IPlayerStateMachine : IInitializable {
    ReadOnlyReactiveProperty<EPlayerState> CurrentState { get; }
    void TransitionTo(EPlayerState newState);
    bool CanTransitionTo(EPlayerState targetState);
}
```

**State Transition Rules:**
- Idle → Moving: A/D input pressed
- Moving → Sprinting: Shift held while moving
- Moving → Jumping: Space pressed while grounded
- Jumping → Falling: Vertical velocity < 0
- Moving → Dashing: Dash input triggered (if not Exhausted)
- Moving → Swinging: Swing input triggered (valid swing point)
- Airborne → Gliding: Jump held while falling
- Any → Exhausted: Ward < threshold (configurable, default 10s)
- Any → Crouching: S key held
- Any → Interacting: Interact key at valid target

**Hiệu năng**: State machine evaluation < 0.05ms per frame (simple enum switch)

---

## Out of Scope

*Handled by neighbouring stories:*
- Story 010: Phase integration (Day/Night trạng thái change listener)
- Story 003-v2: Spirit Dash skill (different hệ thống)
- Story 004-v2: Swing + Glide skills (different hệ thống)
- Story 006-v2: Cover detection (different hệ thống)

---

## QA Test Cases

**[For Logic stories — automated test specs]:**

- **AC-1**: Idle transitions to Moving on A/D input
  - Given: CurrentState = Idle, A/D key pressed
  - When: Update() called
  - Then: CurrentState = Moving

- **AC-2**: Moving transitions to Sprinting on Shift held
  - Given: CurrentState = Moving, Shift held
  - When: Update() called
  - Then: CurrentState = Sprinting

- **AC-3**: Airborne player transitions to Gliding on Jump held
  - Given: CurrentState = Falling, player altitude > 2 units
  - When: Jump key held
  - Then: CurrentState = Gliding

- **AC-4**: Low Ward triggers Exhausted trạng thái
  - Given: CurrentState = Moving, Ward value drops to 8s
  - When: Update() called
  - Then: CurrentState = Exhausted, di chuyển speed reduced by 50%

- **AC-5**: State change emits event
  - Given: IPlayerStateMachine with subscribed listener
  - When: TransitionTo(Moving) called
  - Then: PlayerStateChangedEvent fired with OldState=Idle, NewState=Moving

- **AC-6**: Invalid transition rejected
  - Given: CurrentState = Exhausted
  - When: TransitionTo(Dashing) attempted
  - Then: CanTransitionTo(Dashing) returns false, no transition occurs

---

## Test Evidence

**Story Loại**: Logic
**Required evidence**: `tests/unit/player-controller/player-trạng thái-machine_test.cs` — phải exist and pass

**Trạng thái**: [x] Hoàn tất (see `Assets/_Project/Application/Editor/Tests/PlayerStateMachineTests.cs`)

---

## Dependencies

- Depends on: Story 002-v2 (A/D Movement 2D) — phải be Hoàn tất
- Unlocks: Story 010 (Phase Integration), all skill stories

---

## Blockers

- None — dependencies are Hoàn tất