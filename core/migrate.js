const fs = require('fs');
global.constant = require('./globalVars');

const args = process.argv.slice(2);

const migrateModule = async (model, data) => {
    await model.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true })
        .then(() => model.sync({ force: args[1] === 'force' }));
    if (args[1] === 'force' && data) {
        data.forEach((res) => {
            if (typeof model.customMigrate == 'function') model.customMigrate(res);
            else model.create(res);
        });
    }
};
if (args[0] === 'all') {
    fs.readdir(global.constant.DIR_MODELS, (err, items) => {
        const models = items.map((model) => {
            return new Promise((res) => {

                const tempModel = require(global.constant.DIR_MODELS + model);

                let tempData = false;
                if (fs.existsSync(global.constant.DIR_SEEDS +  model.replace('js', 'json')))
                    tempData = require(global.constant.DIR_SEEDS + model.replace('js', 'json'));

                res([tempModel, tempData]);
            });
        });
        Promise.all(models).then(migrateData => migrateData.forEach(data => migrateModule(...data)));
    });
} else {
    if (!fs.existsSync(global.constant.DIR_MODELS + args[0] + '.js')) return;

    let tempModel = require(global.constant.DIR_MODELS + args[0] + '.js');
    let tempData = false;

    if (fs.existsSync(global.constant.DIR_SEEDS + args[0] + '.json'))
        tempData = require(global.constant.DIR_SEEDS + args[0] + '.json');

    migrateModule(...[tempModel, tempData]);

}