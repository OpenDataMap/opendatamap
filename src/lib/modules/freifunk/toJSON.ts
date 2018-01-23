import 'jquery';
import '../../interfaces/INode'
import '../../interfaces/ISource'
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
        let node = <INode> {};
        if(currentNode.nodeinfo.location !== undefined) {
            node.latitude = currentNode.nodeinfo.location.latitude;
            node.longitude = currentNode.nodeinfo.location.longitude;
            node.showOnMap = true;
        } else {
            node.latitude = 0;
            node.longitude = 0;
            node.showOnMap = false;
        }
        node.name = currentNode.nodeinfo.hostname;
        source.nodes.push(node);
    }
    cb(source);
}