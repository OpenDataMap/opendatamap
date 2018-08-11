import * as fs from "fs";

const config = JSON.parse(fs.readFileSync("src/config.json").toString());
const axios = require('axios');

const downloadDataSource = (dataSourceName) => {
    return new Promise((resolve, reject) => {
        for (let moduleI in config.modules) {
            if (config.modules.hasOwnProperty(moduleI)) {
                const module = config.modules[moduleI];
                if (module.config.layerName === dataSourceName) {
                    let err = false;
                    const dataURL = module.config.dataURL;
                    axios.get(dataURL).then(function (response) {
                        resolve(response.data)
                    }).catch(function (error) {
                        console.error('Error downloading ' + dataURL + ' - StatusCode: ' + error.response.status);
                        reject(Error('Error downloading ' + dataURL + ' - StatusCode: ' + error.response.status))
                    });
                    if (!err) {
                        break;
                    }
                }
            }
        }
    });
};

export const resolvers = {
    Query: {
        getDataSource: (_, {dataSourceName}) => {
            return downloadDataSource(dataSourceName).then((response) => {
                return JSON.stringify(response);
            });
        }
    }
};