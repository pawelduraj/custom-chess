describe('Validators', () => {
    require('./validators/board-validator');
    require('./validators/name-validator');
    require('./validators/piece-validator');
    require('./validators/rules-validator');
    require('./validators/variant-validator');
});

describe('Routes', () => {
    require('./route-create-new-game');
    require('./route-join-game');
});
