import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const api = {
    gameId: '',
    playerId: '',
    token: '',
    game: undefined,
    sse: undefined
};

api.createNewGame = async function (name, time, variant, color) {
    name = localStorage.getItem('name') || 'Anonymous';
    let res = await axios.post(baseUrl + '/api/create-new-game', {name, time, variant, color});
    api.gameId = res.data.gameId;
    api.playerId = res.data.playerId;
    api.token = res.data.token;
};

api.joinGame = async function (name, gameId) {
    name = localStorage.getItem('name') || 'Anonymous';
    let res = await axios.post(baseUrl + '/api/join-game', {name, gameId});
    api.gameId = res.data.gameId;
    api.playerId = res.data.playerId;
    api.token = res.data.token;
};

api.offerDraw = async function () {
    await axios.post(baseUrl + '/api/offer-draw', {token: api.token});
};

api.offerRematch = async function () {
    await axios.post(baseUrl + '/api/offer-rematch', {token: api.token});
};

api.answerDraw = async function (accept) {
    await axios.post(baseUrl + '/api/answer-draw', {token: api.token, accept});
};

api.giveUp = async function () {
    await axios.post(baseUrl + '/api/give-up', {token: api.token});
};

api.makeMove = async function (from, to, promote) {
    await axios.post(baseUrl + '/api/make-move', {token: api.token, from, to, promote});
};

api.listen = async function (update) {
    if (api.sse != null && api.sse.readyState === 1) await api.disconnect();
    api.sse = new EventSource(baseUrl + `/api/listen?gameId=${api.gameId}`);
    api.sse.onmessage = function (event) {
        api.game = JSON.parse(event.data);
        update(api.game);
    };
}

api.disconnect = function () {
    api.sse.close();
}

export default api;
