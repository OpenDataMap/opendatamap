import * as fs from "fs";

const config = JSON.parse(fs.readFileSync("src/config.json").toString());
let sockets = [];
const axios = require('axios').create({
    timeout: 30000
});
import {SHA256} from 'crypto-js'

export function downloadDataSource(module) {
    return new Promise((resolve, reject) => {
        let moduleDataDir = module.config.layerName.replace(/ /g, "-").replace(/\u00dc/g, "Ue").replace(/\u00fc/g, "ue").replace(/\u00c4/g, "Ae").replace(/\u00e4/g, "ae").replace(/\u00d6/g, "Oe").replace(/\u00f6/g, "oe").replace(/\u00df/g, "ss");
        if (!fs.existsSync(__dirname + '/dataSources/' + moduleDataDir)) {
            fs.mkdirSync(__dirname + '/dataSources/' + moduleDataDir);
        }
        const dataURL = module.config.dataURL;
        let filename;
        if (dataURL.indexOf("?") === -1) {
            filename = new Date().getTime() + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'));
        } else {
            filename = new Date().getTime() + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'), dataURL.indexOf('?'));
        }
        if (module.config.localDataFile) {
            resolve(fs.createReadStream(dataURL).pipe(fs.createWriteStream(__dirname + "/dataSources/" + moduleDataDir + "/" + filename)));
        } else {
            axios.get(dataURL, {
                responseType: 'stream'
            }).then(function (response) {
                let file = fs.createWriteStream(__dirname + "/dataSources/" + moduleDataDir + "/" + filename);
                response.data.pipe(file);
                file.on('finish', () => {
                    resolve("OK");
                });
            }).catch(function (error) {
                if (error.response !== undefined) {
                    console.error('Error downloading ' + dataURL + ' - StatusCode: ' + error.response.status);
                    reject("Error")
                } else {
                    reject("Error")
                }
            });
        }
    })
}

export function updateDataSourcesPerodically() {
    let configCopy = Object.assign({}, config);
    setInterval(() => {
        removeOldDataFiles()
        for (const i in configCopy.modules) {
            if (configCopy.modules.hasOwnProperty(i)) {
                let configCopyModule = configCopy.modules[i];
                downloadDataSource(configCopyModule).then(() => {
                    let moduleDataDir = configCopyModule.config.layerName.replace(/ /g, "-").replace(/\u00dc/g, "Ue").replace(/\u00fc/g, "ue").replace(/\u00c4/g, "Ae").replace(/\u00e4/g, "ae").replace(/\u00d6/g, "Oe").replace(/\u00f6/g, "oe").replace(/\u00df/g, "ss");
                    const files = fs.readdirSync(__dirname + "/dataSources/" + moduleDataDir);
                    files.reverse();
                    for (let fileI in files) {
                        if (files.hasOwnProperty(fileI)) {
                            let data = fs.readFileSync(__dirname + "/dataSources/" + moduleDataDir + "/" + files[fileI])
                            if (data) {
                                const json = data.toString().trim();
                                try {
                                    const sourceJSON = JSON.parse(json);
                                    if (configCopyModule.config.timestampName !== "no") {
                                        const timestamp = new Date(sourceJSON[configCopyModule.config.timestampName]);
                                        if (timestamp.getTime() - new Date(configCopyModule.lastTimeStamp).getTime() > 60000 || configCopyModule.lastTimeStamp === undefined) {
                                            for (let socketI in sockets) {
                                                if (sockets.hasOwnProperty(socketI)) {
                                                    let socket = sockets[socketI];
                                                    socket.emit('updatedDataSource', {name: configCopyModule.config.layerName});
                                                }
                                            }
                                            configCopyModule.lastTimeStamp = timestamp;
                                        }
                                    } else {
                                        for (let socketI in sockets) {
                                            if (sockets.hasOwnProperty(socketI)) {
                                                let socket = sockets[socketI];
                                                socket.emit('updatedDataSource', {name: configCopyModule.config.layerName});
                                            }
                                        }
                                    }
                                    break;
                                } catch (e) {
                                    // Oh well, but whatever...
                                }
                            }
                        }
                    }
                }).catch((err) => {
                    // There was error
                });
            }
        }
    }, config.dataRefreshingTime)
}

function removeOldDataFiles() {
    for (let moduleI in config.modules) {
        if (config.modules.hasOwnProperty(moduleI)) {
            const module = config.modules[moduleI];
            // new Date(new Date().getTime() - 3600000)
            let moduleDataDir = module.config.layerName.replace(/ /g, "-").replace(/\u00dc/g, "Ue").replace(/\u00fc/g, "ue").replace(/\u00c4/g, "Ae").replace(/\u00e4/g, "ae").replace(/\u00d6/g, "Oe").replace(/\u00f6/g, "oe").replace(/\u00df/g, "ss");
            const files = fs.readdirSync(__dirname + "/dataSources/" + moduleDataDir);
            let deleteFiles = [];
            for (const fileI in files) {
                if (files.hasOwnProperty(fileI)) {
                    const file = files[fileI];
                    if (files.length - deleteFiles.length >= 5) {
                        deleteFiles.push(file);
                    }
                }
            }
            for (const deleteFileI in deleteFiles) {
                if (deleteFiles.hasOwnProperty(deleteFileI)) {
                    const deleteFile = deleteFiles[deleteFileI];
                    fs.unlinkSync(__dirname + '/dataSources/' + moduleDataDir + "/" + deleteFile);
                }
            }
        }
    }
}

export function socketUpdateDataSource(socket) {
    sockets.push(socket);
}