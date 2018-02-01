import 'jquery';

export function getNodes (config, cb) {
    $.get(config.dataURL + 'test_iotmapper.json').then(function (nodes) {
        cb(nodes);
    })
}