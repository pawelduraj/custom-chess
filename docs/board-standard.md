# Board: Standard

---

### Identifier: `s`

---

### Params:

| Param | Type | Description |
|:---:|:---:|:--- |
| w | number | Width of the board |
| h | number | Height of the board |

---

### Example:

```json
{
  "id": "s",
  "params": [
    {
      "id": "w",
      "value": 8
    },
    {
      "id": "h",
      "value": 8
    }
  ]
}
```

---

### Pieces:

| Piece | ID | Movement |
|:---:|:---:|:---:|
| Amazon | `AZ` | `n*`, `~1/2` |
| Archbishop | `AB` | `nX`, `~1/2` |
| Berolina Pawn | `BP` | `o1X>`, `c1>`, `io2X>` |
| Bishop | `B` | `nX` |
| Centaur | `CT` | `~1/2`, `1*` |
| Chancellor | `CC` | `n+`, `~1/2` |
| King | `K` | `1*` |
| Knight | `N` | `~1/2` |
| Nightrider | `NR` | `n(1/2)`, |
| Pawn | `P` | `o1>`, `c1X>`, `oi2>` |
| Queen | `Q` | `n*` |
| Rook | `R` | `n+` |
