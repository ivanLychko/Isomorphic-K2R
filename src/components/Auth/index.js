const Main = require('./Controllers/Main');
const Index = require('koa-router');

const router = new Index({ prefix: '/auth' });

router.post('/', Main.index);
router.get('/logout', Main.logout);
router.get('/get', Main.getIam);

module.exports = router;