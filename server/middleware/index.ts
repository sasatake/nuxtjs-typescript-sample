const { send } = require('micro');
const { get, router } = require('microrouter');

const hello = (req, res) => send(res, 200, { hello: 'world' });

const notfound = (req, res) => send(res, 404, { message: 'Not found route' });

module.exports = router(get('/hello', hello), get('/*', notfound));
