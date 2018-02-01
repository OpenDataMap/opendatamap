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
    for(const currentNodeID in rawNodes) {
        const currentNode = rawNodes[currentNodeID];
        let node = <INode> {
            latitude: 0,
            longitude: 0,
            showOnMap: false,
            online: false,
            name: ""
        };
        if(currentNode.nodeinfo.location !== undefined) {
            node.latitude = currentNode.nodeinfo.location.latitude;
            node.longitude = currentNode.nodeinfo.location.longitude;
            node.showOnMap = true;
        }
        node.online = !!currentNode.flags.online;
        node.name = currentNode.nodeinfo.hostname;
        source.nodes.push(node);
    }
    cb(source);
}