const User = require(global.constant.DIR_MODELS + 'User');

const Main = {
    index: async (ctx, next) => {
        if (!ctx.request.body.password || !ctx.request.body.login)
            return ctx.body = {
                error: 'undefind data request'
            };

        const pass = ctx.request.body.password;
        const login = ctx.request.body.login;

        const user = await User.findOne({ where: { login } });

        if (!user)
            return ctx.body = {
                error: 'user undefind'
            };

        let isAuth = await User.checkHash(pass, user.password);

        if (!isAuth)
            return ctx.body = {
                error: 'wrong password'
            };

        const md5 = require('md5');
        ctx.session.token = await User.getHash(md5(user.login + user.password + user.role));

        ctx.session.login = user.login;

        return ctx.body = { status: 200 };
    },

    getHashPassword: async (ctx, next) => {
        if (!ctx.request.body.password) return ctx.body = {};

        const pass = ctx.request.body.password;

        return ctx.body = {
            hash: await User.getHash(pass)
        };
    },

    getIam: async (ctx, next) => {
        if (!ctx.session?.login) return ctx.body = {status: 200};

        return ctx.body = await User.findOne({
            attributes: {
                exclude: ['password']
            },
            where : {login:ctx.session.login}
        });
    },

    logout:  async (ctx, next) => {
        ctx.session.token = undefined;
        ctx.session.login = undefined;
        ctx.redirect('/');
        return;
    }
};

module.exports = Main;