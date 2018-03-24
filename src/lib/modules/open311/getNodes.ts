import 'jquery';
import {MD5} from "crypto-js";

export function getNodes (config, cb) {
    const dataURL = "/assets/data/" + MD5(config.dataURL) + config.dataURL.substring(config.dataURL.lastIndexOf('.'));
    $.get(dataURL).then(function (nodes) {
        cb(nodes);
    })
}