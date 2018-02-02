import 'jquery';
import './INode';
import './IGateway';
import './ISource';

export function toJSON (config, rawNodes, cb) {
    let source = <IIoTMapperSource> {
        nodes: [],
        gateways: [],
        config: {
            name: config.layerName
        }
    };
    rawNodes = rawNodes.nodes;
    rawNodes.forEach((currentNode) => {
        let node = <IIoTMapperNode> {
            latitude: 0,
            longitude: 0,
            showOnMap: false,
            name: "",
            dB: 0,
            gateways: []
        };
        if(currentNode.nodeinfo.location !== undefined) {
            node.latitude = currentNode.nodeinfo.location.latitude;
            node.longitude = currentNode.nodeinfo.location.longitude;
            node.showOnMap = true;
        }
        node.name = currentNode.nodeinfo.hostname;
        node.dB = currentNode.nodeinfo.dB;
        currentNode.gateways.forEach((currentGateway) => {
            let gateway = <IIoTMapperGateway> {};
            if(currentGateway.location !== undefined) {
                gateway.latitude = currentGateway.location.latitude;
                gateway.longitude = currentGateway.location.longitude;
                gateway.showOnMap = true;
                gateway.showOnSitebar = true;
            } else {
                gateway.latitude = 0;
                gateway.longitude = 0;
                gateway.showOnMap = false;
            }
            gateway.name = currentGateway.hostname;
            gateway.dB = currentGateway.dB;
            node.gateways.push(gateway);
            if(source.gateways.length != 0) {
                var result = source.gateways.find(function (obj) { return obj.name === gateway.name; });
                if(result == null) {
                    source.gateways.push(gateway);
                }
            } else {
                source.gateways.push(gateway);
            }
        });
        source.nodes.push(node);
    });
    cb(source);
}