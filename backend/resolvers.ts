import * as fs from "fs";
import {SHA256} from "crypto-js";

const config = JSON.parse(fs.readFileSync("src/config.json").toString());

function getDataSource(dataSourceName) {
    return new Promise((resolve, reject) => {
        for (let moduleI in config.modules) {
            if (config.modules.hasOwnProperty(moduleI)) {
                const module = config.modules[moduleI];
                if (module.config.layerName === dataSourceName) {
                    const dataURL = module.config.dataURL;
                    let filename;
                    if (dataURL.indexOf("?") === -1) {
                        filename = module.moduleName + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'));
                    } else {
                        filename = module.moduleName + "_" + SHA256(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'), dataURL.indexOf('?'));
                    }
                    resolve(fs.readFileSync(__dirname + "/dataSources/" + filename).toString());
                    break;
                }
            }
        }
    })
}

export const resolvers = {
    Query: {
        getDataSource: (_, {dataSourceName}) => {
            return getDataSource(dataSourceName).then((response) => {
                return response;
            });
        }
    }
};