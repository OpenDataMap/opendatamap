export function getNodeList(config, cb) {
    let nodelist = [];
    let i = 0;
    config.dataURLs.forEach(function (data) {
        $.get(data + 'nodes.json').then(function (nodes) {
            nodelist.push(nodes);
            i++;
            if(i === config.dataURLs.length) {
                cb(nodelist)
            }
        })
    });
}

