import 'jquery';
import {MD5} from "crypto-js";

export function getNodes (config, cb) {
    getData(config, function (err, nodes) {
        if(!err) {
            cb(nodes);
        } else {
            setTimeout(getData, 2000, config, function (err, nodes) {
                if (!err) {
                    cb(nodes);
                } else {
                    Materialize.toast('Problem beim Laden von ' + config.layerName, 10000);
                    console.error('Problem with loading the layer ' + config.layerName);
                }
            })
        }
    });
}

function getData(config, cb) {
    const dataURL = "/assets/data/" + MD5(config.dataURL) + config.dataURL.substring(config.dataURL.lastIndexOf('.'));
    $.get(dataURL).done((nodes) => {
        cb(null, nodes);
    }).fail((error) => {
        cb("Error", null)
    })
}