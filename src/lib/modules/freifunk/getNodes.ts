import 'jquery';
import {MD5} from "crypto-js";

export function getNodes (moduleConfig, generalConfig, cb) {
    getData(moduleConfig, generalConfig, (err, nodes) => {
        if(!err) {
            cb(nodes);
        } else {
            setTimeout(getData, 2000, moduleConfig, generalConfig, function (err, nodes) {
                if (!err) {
                    cb(nodes);
                } else {
                    Materialize.toast('Problem beim Laden von ' + moduleConfig.layerName, 10000);
                    console.error('Problem with loading the layer ' + moduleConfig.layerName);
                }
            })
        }
    });
}

function getData(moduleConfig, generalConfig, callback) {
    let dataURL = moduleConfig.dataURL;
    if(generalConfig.dataCaching) {
        dataURL = "/assets/data/" + MD5(moduleConfig.dataURL) + moduleConfig.dataURL.substring(moduleConfig.dataURL.lastIndexOf('.'));
    }
    $.get(dataURL).done((nodes) => {
        callback(null, nodes);
    }).fail((error) => {
        callback("Error", null)
    })
}