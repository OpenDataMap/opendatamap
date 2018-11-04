import * as fs from "fs";

const config = JSON.parse(fs.readFileSync("src/config.json").toString());
const axios = require('axios');
import {SHA256} from 'crypto-js'


export function downloadDataSource (dataSourceName) {
    return new Promise((resolve, reject) => {
        for (let moduleI in config.modules) {
            if (config.modules.hasOwnProperty(moduleI)) {
                const module = config.modules[moduleI];
                if (module.config.layerName === dataSourceName) {
                    let err = false;
                    const dataURL = module.config.dataURL;
                    let filename;
                    if (dataURL.indexOf("?") === -1) {
                        filename = module.moduleName + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'));
                    } else {
                        filename = module.moduleName + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'), dataURL.indexOf('?'));
                    }
                    axios.get(dataURL, {
                        responseType: 'stream'
                    }).then(function (response) {
                        let file = fs.createWriteStream(__dirname + "/dataSources/" + filename);
                        response.data.pipe(file);
                        file.on('finish', () => {
                            resolve("OK");
                        });
                    }).catch(function (error) {
                        console.error('Error downloading ' + dataURL + ' - StatusCode: ' + error.response.status);
                        reject("Error")
                    });
                    if (!err) {
                        break;
                    }
                }
            }
        }
    })
}

export function socketUpdateDataSource(socket) {
    let configCopy = Object.assign({}, config);
    setInterval(function () {
        for (const i in configCopy.modules) {
            if (configCopy.modules.hasOwnProperty(i)) {
                let configCopyModule = configCopy.modules[i];
                downloadDataSource(configCopyModule.config.layerName).then(() => {
                    const dataURL = configCopyModule.config.dataURL;
                    let filename;
                    if (dataURL.indexOf("?") === -1) {
                        filename = configCopyModule.moduleName + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'));
                    } else {
                        filename = configCopyModule.moduleName + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'), dataURL.indexOf('?'));
                    }
                    fs.readFile(__dirname + "/dataSources/" + filename, (err, data) => {
                        if(data) {
                            const json = data.toString().trim();
                            try {
                                const sourceJSON =  JSON.parse(json);
                                if (configCopyModule.config.timestampName !== "no") {
                                    const timestamp = new Date(sourceJSON[configCopyModule.config.timestampName]);
                                    if (timestamp.getTime() - new Date(configCopyModule.lastTimeStamp).getTime() > 60000 || configCopyModule.lastTimeStamp === undefined) {
                                        socket.emit('updatedDataSource', {name: configCopyModule.config.layerName});
                                        configCopyModule.lastTimeStamp = timestamp;
                                    }
                                } else {
                                    socket.emit('updatedDataSource', {name: configCopyModule.config.layerName});
                                }
                            } catch (e) {
                                // Oh well, but whatever...
                            }
                        }
                    })
                }).catch((err) => {
                    console.error(err)
                });
            }
        }
    }, config.dataRefreshingTime)
}