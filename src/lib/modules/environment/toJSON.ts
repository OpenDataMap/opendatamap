import './INode';
import './ISource';

export function toJSON (config, rawNodes, cb) {
    let source = <IEnvironmentSource> {
        nodes: [],
        config: {
            name: config.layerName,
            standardActivated: config.standardActivated
        }
    };
    rawNodes.forEach((currentNode) => {
        let node = <IEnvironemntNode> {
            node_id: rawNodes.nodeinfo.node_id,
            sensor_type: rawNodes.nodeinfo.sensor_type,
            description: rawNodes.nodeinfo.description,
            latitude: rawNodes.nodeinfo.latitude,
            longitude: rawNodes.nodeinfo.longitude,
            dataUnit: rawNodes.nodeinfo.dateUnit,
            lastData: rawNodes.lastData.data,
            lastDataTimestamp: rawNodes.lastData.timestamp,
            showOnMap: false
        };
        if(currentNode.lat !== undefined) {
            node.latitude = currentNode.lat;
            node.longitude = currentNode.long;
            node.showOnMap = true;
        }
        source.nodes.push(node);
    });
    cb(source);
}