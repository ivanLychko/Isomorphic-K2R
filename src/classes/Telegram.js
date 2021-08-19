const tg = require('node-telegram-bot-api');
const fs = require('fs');
const Helper = require(global.constant.DIR_HELPERS + 'common');

const cnfTg = require(global.constant.DIR_CONFIG + 'tg.json');

module.exports = class Telegram {
    constructor(token, id = false) {
        this.token = token;
        this.bot = new tg(this.token);
        if (id) this.bot.setWebHook(`${cnfTg.urlWebHook}${id}`);
    }

    async sendMsg(id, msg) {
        try {
            let response = await this.bot.sendMessage(id, msg);
            return response.message_id !== undefined;
        } catch (e) {
            throw new Error(`TelegramBot:\n\rID: ${id}\n\rmsg: ${e.response.body.description}`);
        }

    }

    async sendMsgFile(id, msg, { photo, audio, document, sticker, video, animation, voice,  }) {
        try {
            let response;
      
            if (photo) response = this.bot.sendPhoto(id, photo[photo.length -1].file_id , { caption: msg });
            if (animation) response = this.bot.sendAnimation(id, animation.file_id, { caption: msg });
            if (document) response = this.bot.sendDocument(id, document.file_id, { caption: msg });
            if (audio) response = this.bot.sendAudio(id, audio.file_id, { caption: msg });
            if (video) response = this.bot.sendVideo(id, video.file_id, { caption: msg });
            if (voice) response = this.bot.sendVoice(id, voice.file_id, { caption: msg });
            if (sticker) response = this.bot.sendSticker(id, sticker.file_id, { caption: msg });

            return response;
        } catch (e) {
            console.log(e);
            throw new Error(`TelegramBot:\n\rID: ${id}\n\rmsg: ${e.response.body.description}`);
        }

    }

    async sendMsgWithFileData(id, msg, data = {}) {
        try {
            let response;
            if (Object.keys(data).length) {

                let fileName = global.constant.DIR_PUBLIC + 'logs/' + Date.now() + '.json';
                Helper.createPath(fileName);
                fs.writeFileSync(fileName, JSON.stringify(data));

                response = await this.bot.sendDocument(id, fileName, { caption: msg }, { contentType: 'application/json' })
            } else {
                response = await this.bot.sendMessage(id, msg);
            }
            return response.message_id !== undefined;
        } catch (e) {
            throw new Error(`TelegramBot:\n\rID: ${id}\n\rmsg: ${e.response.body.description}`);
        }

    }
};