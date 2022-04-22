const express = require('express');
const router = express.Router();

router.post('/answer-draw', require('./answer-draw'));
router.post('/answer-rematch', require('./answer-rematch'));
router.post('/create-new-game', require('./create-new-game'));
router.post('/give-up', require('./give-up'));
router.post('/join-game', require('./join-game'));
router.post('/listen', require('./listen'));
router.post('/make-move', require('./make-move'));
router.post('/offer-draw', require('./offer-draw'));
router.post('/offer-rematch', require('./offer-rematch'));

module.exports = router;
