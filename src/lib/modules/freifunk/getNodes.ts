import 'jquery';

export function getNodes (config, cb) {
    $.get(config.dataURL + 'nodes.json').then(function (nodes) {
        cb(nodes);
    })
}