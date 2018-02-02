import 'jquery';
import './INode';
import './ISource';

export function toJSON (config, rawNodes, cb) {
    let source = <ISource> {
        nodes: [],
        config: {
            name: config.layerName
        }
    };
    rawNodes = rawNodes.nodes;
    rawNodes.forEach((currentNode) => {
        let node = <INode> {
            latitude: 0,
            longitude: 0,
            showOnMap: false,
            online: false,
            clients: 0,
            name: "",
            showOnSitebar: true
        };
        if(currentNode.nodeinfo.location !== undefined) {
            node.latitude = currentNode.nodeinfo.location.latitude;
            node.longitude = currentNode.nodeinfo.location.longitude;
            node.showOnMap = true;
        }
        node.online = !!currentNode.flags.online;
        node.name = currentNode.nodeinfo.hostname;
        if(currentNode.statistics.clients !== undefined) {
            node.clients = currentNode.statistics.clients;
        }
        source.nodes.push(node);
    });
    cb(source);
}