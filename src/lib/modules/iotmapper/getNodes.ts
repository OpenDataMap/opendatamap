import 'jquery';

export function getNodes (config, cb) {
    $.get(config.dataURL + 'ttn_mapper.json').then(function (nodes) {
        cb(nodes);
    })
}