import 'jquery';

export function getNodes (config, cb) {
    $.get(config.dataURL + 'test_iot.json').then(function (nodes) {
        cb(nodes);
    })
}