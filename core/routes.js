const fs = require('fs');

module.exports = {
    init: (app) => {
        fs.readdir(global.constant.DIR_COMPONENTS, (err, items) => {
            items.forEach((item) => {
                if (fs.existsSync(global.constant.DIR_COMPONENTS + item + '/index.js')) {
                    let tempRoute = require(global.constant.DIR_COMPONENTS + item + '/index.js');
                    app.use(tempRoute.routes()).use(tempRoute.allowedMethods());
                }
            });
        });
    }
};