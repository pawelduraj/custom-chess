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

### Example

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

### Pieces

| Piece | ID | Movement |
|:---:|:---:|:---:|
| Bishop | `B` | `nX` |
| King | `K` | `1*` |
| Knight | `N` | `~1/2` |
| Queen | `Q` | `n*` |
| Pawn | `P` | `o1>`, `c1X>`, `oi2>` |
| Rook | `R` | `n+` |
