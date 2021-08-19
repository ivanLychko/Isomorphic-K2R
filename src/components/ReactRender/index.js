const Index = require('koa-router');
const router = new Index({ prefix: '' });
const middleware = require('./middleware');

router.get(['/'], middleware.isAuth.bind(middleware));
router.get(['/login'], middleware.loginPageOut.bind(middleware));

router.get(['/users', '/bots'], middleware.isAdmin.bind(middleware));
router.get(['/members'], middleware.isManager.bind(middleware));

router.get(["/", "/users", "/bots", "/members", "/login"], async (ctx, next) => await ctx.render('/index'));

module.exports = router;