global.constant = require('./core/globalVars');
process.env = {...process.env, ...require(global.constant.DIR_CONFIG + 'env.json')};
const cfg = require(global.constant.DIR_CONFIG + 'core.json');
const helpers = require(global.constant.DIR_HELPERS + 'common');
const bodyParser = require('koa-body');
const serve = require('koa-static');
const cron = require('./core/cron');
const socket = require('./core/socket');
const routes = require('./core/routes');
const session = require('koa-session');
const render = require('koa-ejs');
const IO = require('koa-socket-2');
const io = new IO();
const Koa = require('koa');
const app = new Koa();

app.keys = cfg.session.keys;
app.use(session(require(global.constant.DIR_CONFIG + 'session.json'), app));
app.use(serve(global.constant.DIR_PUBLIC));

cfg.render.root = global.constant.DIR_VIEWS;
render(app, cfg.render);

io.attach(app);
app.use(bodyParser(cfg.bodyParser));

app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        const errData = helpers.getStackInfo(err);
        let errObj = { url: ctx.request.url, body: ctx.request.body, query: ctx.request.query, headers: ctx.request.headers };
        helpers.telegramLog(`ERROR: \n\rfile: - ${errData.relativePath} \n\rline: - ${errData.line} \n\rtext: - ${err.message}`, errObj);
    }
});

routes.init(app);
socket.init(io);
cron.init();

app.listen(cfg.port);