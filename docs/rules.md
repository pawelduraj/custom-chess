# Rules

---

### Capture all `capture-all`

> If this rule is enabled, win condition is to capture all of opponent's pieces. Checkmate is not possible.

- `true` - Enable this rule
- `false` - Disable this rule

---

### Castling `castling`

> Castling is a special move.

- `true` - Enable this rule
- `false` - Disable this rule

---

### Multimove `multimove`

> Player can make multiple moves in one turn.

- `[1]` - Each player can make only one move in one turn
- `[2]` - Each player can make two moves in one turn
- `[2, 1]`
    - First player can make two moves in one turn
    - Second player can make only one move in one turn
    - Third player (if exists) can make two moves in one turn
    - Fourth player (if exists) can make only one move in one turn
    - ...
