import * as fs from "fs";
import {SHA256} from "crypto-js";

const config = JSON.parse(fs.readFileSync("src/config.json").toString());

function getDataSource(dataSourceName) {
    return new Promise((resolve, reject) => {
        for (let moduleI in config.modules) {
            if (config.modules.hasOwnProperty(moduleI)) {
                const module = config.modules[moduleI];
                if (module.config.layerName === dataSourceName) {
                    const files = fs.readdirSync(__dirname + "/dataSources/" + dataSourceName.split(" ").join("-"));
                    files.reverse();
                    for (let fileI in files) {
                        if(files.hasOwnProperty(fileI)) {
                            const file = files[fileI];
                            try {
                                JSON.parse(fs.readFileSync(__dirname + "/dataSources/" + dataSourceName.split(" ").join("-") + "/" + file).toString())
                            } catch {
                                fs.unlinkSync(__dirname + "/dataSources/" + dataSourceName.split(" ").join("-") + "/" + file)
                                continue;
                            }
                            resolve(fs.readFileSync(__dirname + "/dataSources/" + dataSourceName.split(" ").join("-") + "/" + file).toString());
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