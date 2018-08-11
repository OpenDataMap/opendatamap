"use strict";
exports.__esModule = true;
var fs = require("fs");
var config = JSON.parse(fs.readFileSync("src/config.json").toString());
var axios = require('axios');
var downloadDataSource = function (dataSourceName) {
    return new Promise(function (resolve, reject) {
        var _loop_1 = function (moduleI) {
            if (config.modules.hasOwnProperty(moduleI)) {
                var module_1 = config.modules[moduleI];
                if (module_1.config.layerName === dataSourceName) {
                    var err = false;
                    var dataURL_1 = module_1.config.dataURL;
                    axios.get(dataURL_1).then(function (response) {
                        resolve(response.data);
                    })["catch"](function (error) {
                        console.error('Error downloading ' + dataURL_1 + ' - StatusCode: ' + error.response.status);
                        reject(Error('Error downloading ' + dataURL_1 + ' - StatusCode: ' + error.response.status));
                    });
                    if (!err) {
                        return "break";
                    }
                }
            }
        };
        for (var moduleI in config.modules) {
            var state_1 = _loop_1(moduleI);
            if (state_1 === "break")
                break;
        }
    });
};
exports.resolvers = {
    Query: {
        getDataSource: function (_, _a) {
            var dataSourceName = _a.dataSourceName;
            return downloadDataSource(dataSourceName).then(function (response) {
                return JSON.stringify(response);
            });
        }
    }
};
