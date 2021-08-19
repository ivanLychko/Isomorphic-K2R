const Main = require('./Controllers/Main');
const Index = require('koa-router');
const middleware = require('./middleware');

const router = new Index({ prefix: '/users' });

router.use('/', middleware.isAdmin.bind(middleware));

router.get('/all', Main.all);
router.get('/managers', Main.getManager);
router.patch('/:id', Main.update);
router.post('/', Main.create);
router.delete('/:id', Main.delete);

module.exports = router;