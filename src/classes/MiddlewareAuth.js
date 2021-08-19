const Middleware = require(global.constant.DIR_CLASSES + 'Middleware');
const User = require(global.constant.DIR_MODELS + 'User');

module.exports = class MiddlewareAuth extends Middleware {

    async isAdmin(ctx, next) {
        if (! await User.isAuth(ctx.session))
            return ctx.redirect('/login');

        ctx.user = await User.findOne({ where: { login: ctx.session.login } });

        if (ctx.user.role !== 'admin')
            return ctx.redirect('/');

        await next();
    }

    async isManager(ctx, next) {
        if (! await User.isAuth(ctx.session))
            return ctx.redirect('/login');

        ctx.user = await User.findOne({ where: { login: ctx.session.login } });
        if (ctx.user.role !== 'manager')
            return ctx.redirect('/');

        await next();
    }

    async isAuth(ctx, next) {
        if (! await User.isAuth(ctx.session))
            return ctx.redirect('/login');

        ctx.user = await User.findOne({ where: { login: ctx.session.login } });

        await next();
    }

}