module.exports.parseGame = require('./parsers/game-parser');

module.exports.isBoardValid = require('./validators/board-validator');
module.exports.isNameValid = require('./validators/name-validator');
module.exports.isPieceValid = require('./validators/piece-validator');
module.exports.areRulesValid = require('./validators/rules-validator');
module.exports.isVariantValid = require('./validators/variant-validator');

module.exports.boardStandard = require('./board-standard/board');
module.exports.boardStandard.makeValidMoveAndReturnBoard = require('./board-standard/board-valid-move-maker');
