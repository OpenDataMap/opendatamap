import * as fs from "fs";

const config = JSON.parse(fs.readFileSync("src/config.json").toString());
let sockets = [];
const axios = require('axios').create({
    timeout: 30000
});
import {SHA256} from 'crypto-js'

export function downloadDataSource(module) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(__dirname + '/dataSources/' + module.config.layerName.split(" ").join("-"))) {
            fs.mkdirSync(__dirname + '/dataSources/' + module.config.layerName.split(" ").join("-"));
        }
        const dataURL = module.config.dataURL;
        let filename;
        if (dataURL.indexOf("?") === -1) {
            filename = new Date().getTime() + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'));
        } else {
            filename = new Date().getTime() + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'), dataURL.indexOf('?'));
        }
        if (module.config.localDataFile) {
            resolve(fs.createReadStream(dataURL).pipe(fs.createWriteStream(__dirname + "/dataSources/" + module.config.layerName.split(" ").join("-") + "/" + filename)));
        } else {
            axios.get(dataURL, {
                responseType: 'stream'
            }).then(function (response) {
                let file = fs.createWriteStream(__dirname + "/dataSources/" + module.config.layerName.split(" ").join("-") + "/" + filename);
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
                    const files = fs.readdirSync(__dirname + "/dataSources/" + configCopyModule.config.layerName.split(" ").join("-"));
                    files.reverse();
                    for (let fileI in files) {
                        if (files.hasOwnProperty(fileI)) {
                            let data = fs.readFileSync(__dirname + "/dataSources/" + configCopyModule.config.layerName.split(" ").join("-") + "/" + files[fileI])
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
            const files = fs.readdirSync(__dirname + "/dataSources/" + module.config.layerName.split(" ").join("-"));
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
                    fs.unlinkSync(__dirname + '/dataSources/' + module.config.layerName.split(" ").join("-") + "/" + deleteFile);
                }
            }
        }
    }
}

export function socketUpdateDataSource(socket) {
    sockets.push(socket);
}