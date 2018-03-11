import 'jquery';

export function getNodes (config, cb) {
    $.get(config.dataURL + 'requests.json?status=open').then(function (nodes) {
        cb(nodes);
    })
}