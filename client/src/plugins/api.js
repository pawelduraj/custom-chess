import axios from 'axios';

axios.baseUrl = 'http://localhost:3000';

const api = {
    gameId: '',
    playerId: '',
    token: '',
    game: undefined,
    sse: undefined
};

api.createNewGame = async function (name, time, variant, color) {
    let res = await axios.post('/api/create-new-game', {name, time, variant, color});
    api.gameId = res.data.gameId;
    api.playerId = res.data.playerId;
    api.token = res.data.token;
};

api.joinGame = async function (name, gameId) {
    let res = await axios.post('/api/join-game', {name, gameId});
    api.gameId = res.data.gameId;
    api.playerId = res.data.playerId;
    api.token = res.data.token;
};

api.offerDraw = async function () {
    await axios.post('/api/offer-draw', {token: api.token});
};

api.offerRematch = async function () {
    await axios.post('/api/offer-rematch', {token: api.token});
};

api.answerDraw = async function (accept) {
    await axios.post('/api/answer-draw', {token: api.token, accept});
};

api.giveUp = async function () {
    await axios.post('/api/give-up', {token: api.token});
};

api.makeMove = async function (from, to, promote) {
    await axios.post('/api/make-move', {token: api.token, from, to, promote});
};

api.listen = async function (update) {
    api.sse = new EventSource(`http://localhost:3000/api/listen?gameId=${api.gameId}`);
    api.sse.onmessage = function (event) {
        api.game = JSON.parse(event.data);
        update(api.game);
    };
}

api.disconnect = function () {
    api.sse.close();
}

export default api;
