describe('Validators', () => {
    require('./validators/board-validator');
    require('./validators/name-validator');
    require('./validators/piece-validator');
    require('./validators/rules-validator');
    require('./validators/variant-validator');
});

describe('Parsers', () => {
    require('./parsers/game-parser');
});

describe('Standard Board', () => {
    require('./board-standard/board-utils');
    require('./board-standard/amazon');
    require('./board-standard/archbishop');
    require('./board-standard/berolina-pawn');
    require('./board-standard/bishop');
    require('./board-standard/centaur');
    require('./board-standard/chancellor');
    require('./board-standard/king');
    require('./board-standard/knight');
    require('./board-standard/nightrider');
    require('./board-standard/pawn');
    require('./board-standard/queen');
    require('./board-standard/rook');
    require('./board-standard/board');
});

describe('Routes', () => {
    require('./routes/create-and-join-game');
    require('./routes/make-move');
    require('./routes/offer-and-answer-draw');
    require('./routes/give-up');
    require('./routes/offer-and-answer-rematch');
});
