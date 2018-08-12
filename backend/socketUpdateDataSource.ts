import * as fs from "fs";

const config = JSON.parse(fs.readFileSync("src/config.json").toString());
const axios = require('axios');

export function socketUpdateDataSource(socket) {
    setInterval(function () {
        for (const i in config.modules) {
            if (config.modules.hasOwnProperty(i)) {
                const configModule = config.modules[i];
                socket.emit('updatedDataSource', {name: configModule.config.layerName});
            }
        }
    }, 60000)
}