import {addNodesFilter} from "./addNodes";
import {addGatewayLinesFilter} from "./addGatewayLines";

export function filterByTime(sourceJSON, filterTimestamp: number[], leafletMap, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway, layerIoTMapperGatewayLines) {
    let newJSON = JSON.parse(JSON.stringify(sourceJSON));
    let newJSONNodes: Object[] = [];
    sourceJSON.nodes.forEach((node) => {
        let nodeTimestamp = new Date(node.time).getTime();
        if (nodeTimestamp > filterTimestamp[0] && nodeTimestamp < filterTimestamp[1] || nodeTimestamp == filterTimestamp[0] || nodeTimestamp == filterTimestamp[1]) {
            newJSONNodes.push(node);
        }
    });
    newJSON.nodes = newJSONNodes;
    addNodesFilter(newJSON, leafletMap, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway);
    addGatewayLinesFilter(newJSON, leafletMap, layerIoTMapperGatewayLines, IoTMapperDevice, IoTMapperGateway);
}