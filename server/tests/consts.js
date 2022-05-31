module.exports.STANDARD_VARIANT = {
    players: 2,
    board: {id: 's', params: [{id: 'w', value: 8}, {id: 'h', value: 8}]},
    pieces: [
        {id: 'R', checkable: false, color: 0, field: 0}, {id: 'R', checkable: false, color: 0, field: 7},
        {id: 'N', checkable: false, color: 0, field: 1}, {id: 'N', checkable: false, color: 0, field: 6},
        {id: 'B', checkable: false, color: 0, field: 2}, {id: 'B', checkable: false, color: 0, field: 5},
        {id: 'Q', checkable: false, color: 0, field: 3}, {id: 'K', checkable: true, color: 0, field: 4},
        {id: 'P', checkable: false, color: 0, field: 8}, {id: 'P', checkable: false, color: 0, field: 9},
        {id: 'P', checkable: false, color: 0, field: 10}, {id: 'P', checkable: false, color: 0, field: 11},
        {id: 'P', checkable: false, color: 0, field: 12}, {id: 'P', checkable: false, color: 0, field: 13},
        {id: 'P', checkable: false, color: 0, field: 14}, {id: 'P', checkable: false, color: 0, field: 15},
        {id: 'R', checkable: false, color: 1, field: 56}, {id: 'R', checkable: false, color: 1, field: 63},
        {id: 'N', checkable: false, color: 1, field: 57}, {id: 'N', checkable: false, color: 1, field: 62},
        {id: 'B', checkable: false, color: 1, field: 58}, {id: 'B', checkable: false, color: 1, field: 61},
        {id: 'Q', checkable: false, color: 1, field: 59}, {id: 'K', checkable: true, color: 1, field: 60}
    ],
    rules: [
        {id: 'capture-all', value: false},
        {id: 'castling', value: true},
        {id: 'multimove', value: [1]}
    ]
};

module.exports.STANDARD_STARTING_BOARD = [
    {id: 'R', checkable: false, color: 0, moved: false}, {id: 'N', checkable: false, color: 0, moved: false},
    {id: 'B', checkable: false, color: 0, moved: false}, {id: 'Q', checkable: false, color: 0, moved: false},
    {id: 'K', checkable: true, color: 0, moved: false}, {id: 'B', checkable: false, color: 0, moved: false},
    {id: 'N', checkable: false, color: 0, moved: false}, {id: 'R', checkable: false, color: 0, moved: false},
    {id: 'P', checkable: false, color: 0, moved: false}, {id: 'P', checkable: false, color: 0, moved: false},
    {id: 'P', checkable: false, color: 0, moved: false}, {id: 'P', checkable: false, color: 0, moved: false},
    {id: 'P', checkable: false, color: 0, moved: false}, {id: 'P', checkable: false, color: 0, moved: false},
    {id: 'P', checkable: false, color: 0, moved: false}, {id: 'P', checkable: false, color: 0, moved: false},
    '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
    '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-',
    {id: 'P', checkable: false, color: 1, moved: false}, {id: 'P', checkable: false, color: 1, moved: false},
    {id: 'P', checkable: false, color: 1, moved: false}, {id: 'P', checkable: false, color: 1, moved: false},
    {id: 'P', checkable: false, color: 1, moved: false}, {id: 'P', checkable: false, color: 1, moved: false},
    {id: 'P', checkable: false, color: 1, moved: false}, {id: 'P', checkable: false, color: 1, moved: false},
    {id: 'R', checkable: false, color: 1, moved: false}, {id: 'N', checkable: false, color: 1, moved: false},
    {id: 'B', checkable: false, color: 1, moved: false}, {id: 'Q', checkable: false, color: 1, moved: false},
    {id: 'K', checkable: true, color: 1, moved: false}, {id: 'B', checkable: false, color: 1, moved: false},
    {id: 'N', checkable: false, color: 1, moved: false}, {id: 'R', checkable: false, color: 1, moved: false}
];
