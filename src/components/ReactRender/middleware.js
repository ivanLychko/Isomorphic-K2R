const MiddlewareAuth = require(global.constant.DIR_CLASSES + 'MiddlewareAuth');
const User = require(global.constant.DIR_MODELS + 'User');

const middleware = new MiddlewareAuth();

middleware.loginPageOut = async (ctx, next) => {
    if (await User.isAuth(ctx.session)) return ctx.redirect('/');

    await next();
}


module.exports = middleware;