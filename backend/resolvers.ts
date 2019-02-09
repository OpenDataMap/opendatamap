import * as fs from "fs";
import {SHA256} from "crypto-js";

const config = JSON.parse(fs.readFileSync("src/config.json").toString());

function getDataSource(dataSourceName) {
    return new Promise((resolve, reject) => {
        for (let moduleI in config.modules) {
            if (config.modules.hasOwnProperty(moduleI)) {
                const module = config.modules[moduleI];
                if (module.config.layerName === dataSourceName) {
                    let moduleDataDir = module.config.layerName.replace(/ /g, "-").replace(/\u00dc/g, "Ue").replace(/\u00fc/g, "ue").replace(/\u00c4/g, "Ae").replace(/\u00e4/g, "ae").replace(/\u00d6/g, "Oe").replace(/\u00f6/g, "oe").replace(/\u00df/g, "ss");
                    const files = fs.readdirSync(__dirname + "/dataSources/" + moduleDataDir);
                    files.reverse();
                    for (let fileI in files) {
                        if(files.hasOwnProperty(fileI)) {
                            const file = files[fileI];
                            try {
                                JSON.parse(fs.readFileSync(__dirname + "/dataSources/" + moduleDataDir + "/" + file).toString())
                            } catch {
                                fs.unlinkSync(__dirname + "/dataSources/" + moduleDataDir + "/" + file);
                                continue;
                            }
                            resolve(fs.readFileSync(__dirname + "/dataSources/" + moduleDataDir + "/" + file).toString());
                            break;
                        }
                    }
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