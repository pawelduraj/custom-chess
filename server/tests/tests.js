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

describe('Boards', () => {
   require('./board-standard/board');
});

describe('Routes', () => {
    require('./routes/create-and-join-game');
    require('./routes/make-move');
    require('./routes/offer-and-answer-draw');
    require('./routes/give-up');
    require('./routes/offer-and-answer-rematch');
});
