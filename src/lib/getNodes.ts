export function getNodeList(config) {
    let nodelist = [];
    config.dataURLs.forEach(function (data) {
        $.get(data + 'nodes.json', function (nodes) {
            nodelist.push(nodes);
        })
    });
    return nodelist
}

