process.env.NODE_ENV = 'test';
const Mocha = require('mocha');

const mocha = new Mocha({});

mocha.addFile(require('path').join('tests', 'tests.js'));

global.app = require('../app.js');

app.on('ready', () => {
    mocha.run((failures) => {
        process.exit(failures ? 1 : 0);
    });
});
