import 'jquery';
import './INode';
import './IGateway';
import './ISource';

export function toJSON (config, rawNodes, cb) {
    let source = <IIoTMapperSource> {
        nodes: [],
        gateways: [],
        mapper: [],
        config: {
            name: config.layerName,
            iotNodes: config.iotNodes,
            iotMapper: config.iotMapper,
            iotGateways: config.iotGateways,
            iotGatewayLines: config.iotGatewayLines
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
            time: "",
            gateways: []
        };
        if(currentNode.nodeinfo.location !== undefined) {
            node.latitude = currentNode.nodeinfo.location.latitude;
            node.longitude = currentNode.nodeinfo.location.longitude;
            node.showOnMap = true;
        }
        node.name = currentNode.nodeinfo.hostname;
        node.dB = currentNode.nodeinfo.dB;
        node.time = currentNode.nodeinfo.time;
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
                let result = source.gateways.find(function (obj) { return obj.name === gateway.name; });
                if(result == null) {
                    source.gateways.push(gateway);
                }
            } else {
                source.gateways.push(gateway);
            }
        });
        let mapper = <IIoTMapperNode> {
            latitude: 0,
            longitude: 0,
            showOnMap: false,
            name: "",
            dB: 0,
            time: "",
            gateways: []
        };
        mapper.name = node.name;
        mapper.time = node.time;
        mapper.latitude = node.latitude;
        mapper.longitude = node.longitude;
        if((Date.now() - Date.parse(mapper.time)) <= config.filterMapper) {
            mapper.showOnMap = true;
        }
        if(source.mapper.length != 0) {
            let result = source.mapper.find(function (obj) { return obj.name === mapper.name; });
            if(result == null) {
                source.mapper.push(mapper);
            }
        } else {
            source.mapper.push(mapper);
        }
        if(source.nodes.length != 0) {
            let result = source.nodes.find(function (obj) {
                return ((Math.abs(obj.latitude - node.latitude) < config.filterValue) && (Math.abs(obj.longitude - node.longitude) < config.filterValue)); 
            });
            if(result == null) {
                source.nodes.push(node);
            }
        } else {
            source.nodes.push(node);
        }
    });
    // sort nodes for dB
    source.nodes.sort(function(a, b) { return a.dB - b.dB });
    cb(source);
}