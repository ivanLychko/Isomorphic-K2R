const fs = require('fs');
const path = require('path');

const validWords = (count, words) => {
    count += '';
    let lastNum = count.substr(-1);
    if (count > 4 && count < 21)
        return words[2];
    else if (lastNum < 5 && lastNum > 1)
        return words[1];
    else if (lastNum == 1)
        return words[0];
    else
        return words[2];
}

const getStackInfo = (err) => {
    let stack = err.stack.split('\n').slice(1).filter(i => i.indexOf('node_modules') === -1)[0];
    let sp = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi.exec(stack) || /at\s+()(.*):(\d*):(\d*)/gi.exec(stack);

    if (sp && sp.length === 5) {
        return {
            method: sp[1],
            relativePath: path.relative(global.constant.PROJECT_ROOT, sp[2]),
            line: sp[3],
            pos: sp[4],
            file: path.basename(sp[2])
        }
    }
}

const convertDate = (dateStr, func) => {
    let tmp = dateStr.split('.');
    dateStr = [tmp[1], tmp[0], tmp[2]].join('.');

    let date = new Date(dateStr);
    if (func !== undefined) date = func(date);

    let str;
    str = date.getFullYear() + '-';

    let mon = date.getMonth() + 1;

    if (mon < 10) mon = '0' + mon;
    str += mon + '-';

    let day = date.getDate();

    if (day < 10) day = '0' + day;
    str += (day + 'T');

    let h = date.getHours();
    if (h < 10) h = '0' + h;
    str += (h + ':');

    let m = date.getMinutes();
    if (m < 10) m = '0' + m;
    str += (m + ':');

    let s = date.getSeconds();
    if (s < 10) s = '0' + s;
    str += (s + '+03:00');

    return str;
};

const createPath = (path) => {
    if (!fs.existsSync(path)) {
        let pathDir = path.split("/");
        pathDir.pop();
        pathDir = pathDir.join("/");
        fs.mkdirSync(pathDir, { recursive: true });
    }
}

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const genRandomString = (lengthMin, lengthMax) => {
    const abc = 'abcdefghigklmnopqrstuvwxyz';
    const length = getRandomInt(lengthMin, lengthMax);
    let str = '';
    for (let i = 0; i < length; i++)
        str += abc[getRandomInt(0, length)];

    return str;
}

const writeJsonInCSV = async (path, data, append = false, params = '') => {
    const { Parser } = require('json2csv');

    return await new Promise(async (resolve, reject) => {
        let fields = [];
        for (let key in data[0])
            fields.push(key);

        let parser = new Parser({ fields });
        let csv = parser.parse(data).replace(/\"/gi, '');

        if (!fs.existsSync(path)) {
            let pathDir = path.split("/");
            pathDir.pop();
            pathDir = pathDir.join("/");
            fs.mkdirSync(pathDir, { recursive: true });
        }

        if (append && fs.existsSync(path)) {
            let csvArray = csv.split("\n");
            csvArray.shift();
            csv = "\n" + csvArray.join("\n");

            fs.appendFile(path, csv, 'UTF-8', (err) => {
                if (err) reject(err);
                else resolve('true');
            });
        } else {
            fs.writeFile(path, (params != '' ? params + "\n" : '') + csv + "\n", 'UTF-8', (err) => {
                if (err) reject(err);
                else resolve('true');
            });
        }
    });

}

const telegramLog = async (msg, data = {}) => {
    if (typeof msg === "object")
        msg = Object.entries(msg).reduce((acc, i) => acc + `${i[0]}: - ${i[1]}\n\r`, '');

    const config = require(global.constant.PROJECT_ROOT + 'config/tgLogs.json');
    const Telegram = require(global.constant.DIR_CLASSES + 'Telegram');
    if (config.isSend) {
        let bot = new Telegram(config.token);
        config.ids.forEach(id => bot.sendMsgWithFileData(id, msg, data));
    } else
        console.error(msg);
};

module.exports = {
    validWords,
    getStackInfo,
    convertDate,
    createPath,
    getRandomInt,
    genRandomString,
    writeJsonInCSV,
    telegramLog
};