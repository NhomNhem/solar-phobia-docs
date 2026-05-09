---
title: 'ADR-0003: Bộ điều khiển người chơi Pattern'
description: 'Bản dịch tiếng Việt cho ADR-0003: Bộ điều khiển người chơi Pattern.'
---

> Bản dịch nháp tự động từ tài liệu English. Vui lòng đối chiếu bản English khi cần độ chính xác tuyệt đối.

## Trạng thái
**Đã được thay thế** — replaced by ADR-0003-v2 (2026-05-09)

> Master GDD V5.0 confirmed the game is a **2D side-scrolling precision platformer**.
> See `adr-0003-v2-player-controller-2d.md` for the current decision.
> Code derived from this ADR (MovementCalculator, SprintController, CoverDetector)
> is **archived** — do not delete, do not extend.

---

## Original Quyết định (Archived — 2026-05-07)

## Trạng thái (Original)
Đã chấp nhận

## Ngày
2026-05-07

## Bối cảnh

### Vấn đề cần giải quyết
The player controller phải xử lý dramatically different input modes between day and night phases:
- **Day**: UI-only (click to select souls, assign rituals) — no di chuyển vật lý
- **Night**: Full di chuyển WASD, sprint, cover, contextual E-key interactions

This creates the core emotional contrast: calm deliberation vs. panicked survival. Without proper phase gating, the wrong input mode would be đang hoạt động, breaking the game's identity.

### Ràng buộc
- **Engine**: Unity 6000.3.11f1 (Unity 6) — beyond LLM training data
- **Input**: Phải use New Input System (required for Unity 6)
- **Physics**: CharacterController for di chuyển (not physics-based)
- **Hiệu năng**: Movement processing <1ms per frame

### Yêu cầu
- Phase-gated input: Dịch vụ ban ngày = UI only, Sinh tồn ban đêm = di chuyển + actions
- WASD base di chuyển with sprint multiplier
- Cover detection (fully inside cover volume)
- E-key tương tác theo ngữ cảnh (relic pickup, shrine trigger)
- No combat inputs (flight-only survival)

## Quyết định

The Bộ điều khiển người chơi uses CharacterController for di chuyển, New Input System for input handling, and phase gating via IPhaseStateMachine. phase ban ngày ignores all di chuyển input; phase ban đêm enables full control.

### Sơ đồ kiến trúc

```
┌─────────────────────────────────────────────────────────────┐
│                    PLAYER CONTROLLER                         │
│                   (VContainer Singleton)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐      │
│  │              INPUT PROCESSING                       │      │
│  │  ┌─────────────────┐    ┌─────────────────────┐    │      │
│  │  │ New Input System│───►│ Input Mode Router  │    │      │
│  │  │ (PlayerInput)  │    │ (DayUI / NightMove)│    │      │
│  │  └─────────────────┘    └──────────┬──────────┘    │      │
│  │                                   │                 │      │
│  │              ┌───────────────────┴───────────────────┐  │
│  │              ▼                                       ▼  │
│  │     ┌─────────────────┐                ┌─────────────────┐
│  │     │   DAY MODE      │                │  NIGHT MODE    │
│  │     │ (UI Clicks only)│                │ (WASD + Actions)│
│  │     │ - Mouse clicks  │                │ - Move vector  │
│  │     │ - Selection     │                │ - Sprint       │
│  │     │ - Confirm       │                │ - E-interact   │
│  │     │ - Ignore WASD   │                │ - Cover detect │
│  │     └─────────────────┘                └─────────────────┘
│  └─────────────────────────────────────────────────────────────┘
│                              │
│                              ▼
│  ┌─────────────────────────────────────────────────────────────┐
│  │              MOVEMENT EXECUTION (Night Only)              │
│  │  ┌─────────────────┐    ┌─────────────────────────────┐    │
│  │  │CharacterController│──►│  Movement Physics         │    │
│  │  │    .Move()      │    │  - base_speed * sprint    │    │
│  │  └─────────────────┘    │  - gravity                │    │
│  │                        │  - collision              │    │
│  │                        └─────────────────────────────┘    │
│  └─────────────────────────────────────────────────────────────┘
│                              │
│           ┌──────────────────┼──────────────────┐
│           ▼                  ▼                  ▼
│    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│    │ Cover Check│    │  Strike     │    │ Relic Pickup │
│    │ (bounds)   │    │  Warning    │    │   (E key)    │
│    └──────────────┘    └──────────────┘    └──────────────┘
└─────────────────────────────────────────────────────────────┘
```

### Key Interfaces

```csharp
public interface IPlayerController {
    Vector3 Position { get; }
    bool IsGrounded { get; }
    bool IsSprinting { get; }
    bool IsInCover { get; }
    
    void Enable();   // Phase-gated: Night only
    void Disable(); // Phase-gated: Day + other phases
    
    event Action<string> OnInteract; // "relic", "shrine"
    event Action<bool> OnSprintChanged;
}

public enum PlayerInputMode {
    DayUI,       // Mouse clicks only
    NightMovement, // WASD + actions
    Disabled     // No input
}
```

### Triển khai

```csharp
public class PlayerController : MonoBehaviour, IPlayerController {
    [SerializeField] private CharacterController _characterController;
    [SerializeField] private PlayerInputActions _inputActions;
    
    private readonly IPhaseStateMachine _phaseStateMachine;
    private readonly ReactiveProperty<bool> _isEnabled = new(false);
    private readonly ReactiveProperty<bool> _isSprinting = new(false);
    private readonly ReactiveProperty<bool> _isInCover = new(false);
    
    private PlayerInputMode _currentMode = PlayerInputMode.Disabled;
    
    public Vector3 Position => transform.position;
    public bool IsGrounded => _characterController.isGrounded;
    public bool IsSprinting => _isSprinting.Value;
    public bool IsInCover => _isInCover.Value;
    
    public event Action<string> OnInteract;
    public event Action<bool> OnSprintChanged;
    
    // Config
    private float _baseMoveSpeed = 5f;
    private float _sprintMultiplier = 1.5f;
    
    private void OnEnable() {
        _phaseStateMachine.CurrentPhase
            .Subscribe(OnPhaseChanged);
        
        _inputActions.Player.Move.performed += OnMoveInput;
        _inputActions.Player.Sprint.performed += OnSprintInput;
        _inputActions.Player.Interact.performed += OnInteractInput;
    }
    
    private void OnPhaseChanged(PhaseState phase) {
        switch (phase) {
            case PhaseState.NightSurvival:
                Enable();
                _currentMode = PlayerInputMode.NightMovement;
                break;
            case PhaseState.DayService:
            case PhaseState.ChoiceLock:
            case PhaseState.Resolve:
            case PhaseState.Reset:
                Disable();
                _currentMode = PlayerInputMode.Disabled;
                break;
        }
    }
    
    private void Update() {
        if (_currentMode != PlayerInputMode.NightMovement) return;
        
        ProcessMovement();
        CheckCover();
    }
    
    private void ProcessMovement() {
        var moveInput = _inputActions.Player.Move.ReadValue<Vector2>();
        var moveVector = new Vector3(moveInput.x, 0, moveInput.y);
        
        // Sprint check
        var sprintHeld = _inputActions.Player.Sprint.IsPressed();
        if (sprintHeld != _isSprinting.Value) {
            _isSprinting.Value = sprintHeld;
            OnSprintChanged?.Invoke(sprintHeld);
        }
        
        var speed = _baseMoveSpeed * (sprintHeld ? _sprintMultiplier : 1f);
        
        // Apply gravity
        moveVector.y = -9.81f * Time.deltaTime;
        
        _characterController.Move(moveVector * speed * Time.deltaTime);
    }
    
    private void CheckCover() {
        // Raycast or bounds check against cover volumes
        // Requires FULL containment, not partial overlap
        _isInCover.Value = CoverSystem.CheckPlayerFullyInside(transform.position);
    }
    
    private void OnInteractInput(InputAction.CallbackContext ctx) {
        if (_currentMode != PlayerInputMode.NightMovement) return;
        
        // Check what's in front of player
        var hit = Physics.Raycast(transform.position, transform.forward, 2f);
        
        if (hit.collider.CompareTag("CursedMound")) {
            OnInteract?.Invoke("relic");
        }
        else if (hit.collider.CompareTag("EndShrine")) {
            OnInteract?.Invoke("shrine");
        }
    }
    
    public void Enable() {
        _isEnabled.Value = true;
        _inputActions.Player.Enable();
    }
    
    public void Disable() {
        _isEnabled.Value = false;
        _inputActions.Player.Disable();
    }
}

// New Input System actions (generated .cs file)
public class PlayerInputActions : IInputActions {
    public InputAction Move { get; }
    public InputAction Sprint { get; }
    public InputAction Interact { get; }
    // ...
}
```

### VContainer Registration

```csharp
public class GameplayInstaller : MonoInstaller {
    public override void Install(IContainerBuilder builder) {
        builder.RegisterComponentInHierarchy<PlayerController>();
        
        // Register actions (created via New Input System asset)
        builder.Register<PlayerInputActions>(Lifetime.Singleton);
    }
}
```

## Các phương án đã cân nhắc

### Alternative 1: Unity's Starter Assets (Character Controller)
- **Description**: Use Unity's Starter Assets package for character di chuyển
- **Pros**: Pre-built, well-tested, includes sprint/jump/animation
- **Cons**: Heavy dependency, includes features we don't need, harder to customize phase gating
- **Rejection Reason**: Project needs custom phase gating and flight-only (no combat), Starter Assets assumes combat

### Alternative 2: Rigidbody-based Physics
- **Description**: Use Unity physics with Rigidbody for di chuyển
- **Pros**: Native physics integration, good for complex collisions
- **Cons**: Overkill for 2D side-scrolling, harder to tune, more unpredictable
- **Rejection Reason**: CharacterController is better for controlled, predictable platformer di chuyển

### Alternative 3: Old Input System (Input.GetAxis)
- **Description**: Use Unity's legacy Input manager
- **Pros**: Simple, well-known, no setup required
- **Cons**: Deprecated, not recommended for Unity 6, no gamepad hỗ trợ
- **Rejection Reason**: Project targets Unity 6, New Input System is recommended approach

## Hệ quả

### Positive
- **Phase gating**: Movement automatically bị tắt in phase ban ngày
- **New Input System**: Modern input handling, gamepad hỗ trợ built-in
- **CharacterController**: Predictable, controllable di chuyển for platformer
- **Cover detection**: Clear rules (full containment) for sweep avoidance

### Negative
- **Complex máy trạng thái**: Input mode routing adds code complexity
- **Platforming feel**: Phải tune CharacterController for right "weighty" feel

### Risks
- **Rủi ro**: Input System not initialized before PlayerController
  - **Mitigation**: VContainer initialization order, lazy initialization
- **Rủi ro**: Cover detection too strict (player frustrated)
  - **Mitigation**: Tune cover volume sizes, consider partial-overlap compromise

## Hiệu năng Implications
- **CPU**: Movement processing ~0.2-0.5ms per frame
- **Memory**: CharacterController minimal, Input Action asset small
- **Load Time**: No impact (singleton, lazy init)

## Migration Plan
1. Create PlayerInputActions via New Input System (asset)
2. Create PlayerController.cs with CharacterController
3. Register in GameplayInstaller (VContainer)
4. Subscribe to PhaseStateMachine for mode switching
5. Wire up E-key interactions to Bộ xử lý hậu quả / Mục tiêu miếu

## Validation Criteria
- [ ] WASD ignored during Dịch vụ ban ngày phase
- [ ] WASD works during Sinh tồn ban đêm phase
- [ ] Sprint (Shift) increases speed by 1.5x
- [ ] E-key triggers relic pickup near CursedMound
- [ ] E-key triggers shrine tương tác near EndShrine
- [ ] Cover detection yêu cầu full containment
- [ ] No combat inputs (attack, block) exist

## Related Decisions
- ADR-0001: Máy trạng thái phase Architecture — provides phase gating
- ADR-0002: Kho dữ liệu linh hồn Pattern — phase-locked trạng thái
- Related GDD: design/gdd/player-controller.md

---

## Engine Compatibility

| Field | Value |
|-------|-------|
| Engine | Unity 6000.3.11f1 |
| Post-Cutoff APIs Used | New Input System (required for Unity 6) |
| API đã lỗi thời | None |

### Verification
✅ New Input System is recommended for Unity 6 — no deprecation concerns.

## Yêu cầu GDD Addressed

| TR-ID | Yêu cầu | Trạng thái |
|-------|-------------|--------|
| TR-player-001 | Phase-gated input (Day=UI, Night=move) | ✅ Covered |
| TR-player-002 | WASD base di chuyển | ✅ Covered |
| TR-player-003 | Sprint with Shift | ✅ Covered |
| TR-player-004 | Cover hệ thống (full containment) | ✅ Covered |
| TR-player-005 | E-key contextual interact | ✅ Covered |
| TR-player-006 | No combat inputs | ✅ Covered |
| TR-player-007 | Cursor visibility per phase | ✅ Covered |
| TR-player-008 | Movement bị tắt in non-Night phases | ✅ Covered |
| TR-player-009 | Strike warning received from Map Director | ✅ Covered |
| TR-player-010 | Relic pickup triggers Resource Effects | ✅ Covered |