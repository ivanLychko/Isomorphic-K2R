const { parse } = require('fast-csv');
const fs = require('fs');
global.constant = require('./globalVars');
const { genRandomString } = require(global.constant.DIR_HELPERS + 'common');

const args = process.argv.slice(2);


(async () => {
    fs.readdir(global.constant.DIR_CONFIG, (err, items) => {
        items
            .forEach((cnf) => {
                const path = global.constant.DIR_CONFIG + cnf;

                if (cnf.includes('example')) {
                    const newPath = global.constant.DIR_CONFIG + cnf.replace('example.', '');
                    if (args[0] == 'force' || !fs.existsSync(newPath)) {
                        if (cnf.includes('core')) {

                            const data = fs.readFileSync(path);
                            fs.writeFileSync(newPath, JSON.stringify({ ...JSON.parse(data), session: { keys: [genRandomString(32, 45), genRandomString(32, 45)] } }));

                        } else fs.copyFileSync(path, newPath);

                        console.log(`Create config file - ${newPath}`);
                    }
                }
            })
    });
})();
