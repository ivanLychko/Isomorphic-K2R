const fs = require('fs');

module.exports = {
    init: () => {
        fs.readdir(global.constant.DIR_COMPONENTS, (err, items) => {
            items.forEach((item) => {
                if (fs.existsSync(global.constant.DIR_COMPONENTS + item + '/cron.js')) {
                    let tempRoute = require(global.constant.DIR_COMPONENTS + item + '/cron.js');
                    tempRoute.init();
                }
            });
        });
    },
};