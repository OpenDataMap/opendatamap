import {addNodesFilter} from "./addNodes";
import {addGatewayLinesFilter} from "./addGatewayLines";
import configHelper from '../../../helper/config'

export function filterByTime(sourceJSON, filterTimestamp: number[], leafletMap, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway, layerIoTMapperGatewayLines) {
    let newJSON = JSON.parse(JSON.stringify(sourceJSON));
    let newJSONNodes: Object[] = [];
    configHelper.getModuleCurrentConf("IoT Mapper Hennef", (newCurrentConf) => {
        newCurrentConf.filterTimestamp = filterTimestamp;
        configHelper.modifyModule("IoT Mapper Hennef", newCurrentConf)
        sourceJSON.nodes.forEach((node) => {
            let nodeTimestamp = new Date(node.time).getTime();
            if (nodeTimestamp > filterTimestamp[0] && nodeTimestamp < filterTimestamp[1] || nodeTimestamp == filterTimestamp[0] || nodeTimestamp == filterTimestamp[1]) {
                newJSONNodes.push(node);
            }
        });
        newJSON.nodes = newJSONNodes;
        addNodesFilter(newJSON, leafletMap, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway);
        addGatewayLinesFilter(newJSON, leafletMap, layerIoTMapperGatewayLines, IoTMapperDevice, IoTMapperGateway);
    });
}