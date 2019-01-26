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
            pubId: currentNode.meta.pubId,
            nodeType: currentNode.meta.nodeType,
            hasSensor: currentNode.meta.hasSensor,
            hasActuator: currentNode.meta.hasActuator,
            latitude: 0,
            longitude: 0,
            altitude: 0,
            sensors: [],
            actuator: [],
            showOnMap: false,
        };
        if(currentNode.meta.geoLat !== undefined && currentNode.meta.getLat !== 0 && currentNode.meta.geoLon !== undefined && currentNode.meta.getLon !== 0) {
            node.latitude = currentNode.meta.geoLat;
            node.longitude = currentNode.meta.geoLon;
            node.altitude = currentNode.meta.getAlt;
            node.showOnMap = true;
        }
        if(node.hasSensor) {
            for (let sensorI in currentNode.meta.sensor) {
                if(currentNode.meta.sensor.hasOwnProperty(sensorI)) {
                    let sensor = currentNode.meta.sensor[sensorI];
                    for(let dataSensorI in currentNode.data.sensor) {
                        if(currentNode.data.sensor.hasOwnProperty(dataSensorI)) {
                            let dataSensor = currentNode.data.sensor[dataSensorI];
                            if(dataSensor.sensorName === sensor.sensorName) {
                                node.sensors.push({
                                    sensorName: sensor.sensorName,
                                    sensorInterval: sensor.sensorInterval,
                                    nodeSubType: sensor.nodeSubType,
                                    sensorType: sensor.sensorType,
                                    dataFormat: sensor.dataFormat,
                                    lastData: dataSensor.sensorData
                                });
                                break;
                            }
                        }
                    }
                }
            }
        }

        if(node.hasActuator) {
            for (let actuatorI in currentNode.meta.actuator) {
                if(currentNode.meta.actuator.hasOwnProperty(actuatorI)) {
                    let actuator = currentNode.meta.actuator[actuatorI];
                    for(let dataActuatorI in currentNode.data.actuator) {
                        if(currentNode.data.actuator.hasOwnProperty(dataActuatorI)) {
                            let dataActuator = currentNode.data.actuator[dataActuatorI];
                            if(dataActuator.actuatorName === actuator.actuatorName) {
                                node.actuator.push({
                                    actuatorName: actuator.actuatorName,
                                    nodeSubType: actuator.nodeSubType,
                                    dataFormat: actuator.dataFormat,
                                    lastData: dataActuator.actuatorData
                                });
                                break;
                            }
                        }
                    }
                }
            }
        }
        source.nodes.push(node);
    });
    console.log(source);
    cb(source);
}