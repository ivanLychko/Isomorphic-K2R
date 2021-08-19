const User = require(global.constant.DIR_MODELS + 'User');

const Main = {
    all: async (ctx, next) => {
        return ctx.body = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        });
    },
    
    getManager: async (ctx, next) => {
        return ctx.body = await User.findAll({
            attributes: {
                exclude: ['password']
            },
            where: {
                role: 'manager'
            }
        });
    },
    create: async (ctx, next) => {
        await User.create({ ...ctx.request.body, password: 'tmp' });
        return ctx.body = { status: 'ok' };
    },
    update: async (ctx, next) => {
        if (ctx.request.body?.password)
            ctx.request.body = { ...ctx.request.body, password: await User.getHash(ctx.request.body.password) };

        if (ctx.request.body?.role && +ctx.params.id === 1) 
            return ctx.body = { status: 'ok' };

        await User.update({ ...ctx.request.body }, { where: { ...ctx.params } });
        return ctx.body = { status: 'ok' };
    },
    delete: async (ctx, next) => {
        if (+ctx.params.id !== 1)
            await User.destroy({ where: { ...ctx.params } });
        return ctx.body = { status: 'ok' };
    }
};

module.exports = Main;