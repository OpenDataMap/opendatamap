import 'jquery';
import {MD5} from "crypto-js";

export function getNodes (config, cb) {
    const dataURL = "/assets/data/" + MD5(config.dataURL) + config.dataURL.substring(config.dataURL.lastIndexOf('.'));
    $.get(dataURL).done((nodes) => {
        cb(nodes);
    }).fail((error) => {
        Materialize.toast('Problem loading ' + config.layerName, 10000);
        console.error('Problem with loading the layer ' + config.layerName)
    })
}