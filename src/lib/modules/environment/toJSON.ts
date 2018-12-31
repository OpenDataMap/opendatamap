import './INode';
import './ISource';

export function toJSON (config, rawData, cb) {
    let source = <IEnvironmentSource> {
        nodes: [],
        config: {
            name: config.layerName,
            standardActivated: config.standardActivated
        }
    };
    rawData.nodes.forEach((currentNode) => {
        let node = <IEnvironemntNode> {
            node_id: currentNode.nodeinfo.node_id,
            sensor_type: currentNode.nodeinfo.sensor_type,
            description: currentNode.nodeinfo.description,
            latitude: currentNode.nodeinfo.location.latitude,
            longitude: currentNode.nodeinfo.location.longitude,
            dataUnit: currentNode.nodeinfo.dataUnit,
            lastData: currentNode.lastData.data,
            lastDataTimestamp: currentNode.lastData.timestamp,
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