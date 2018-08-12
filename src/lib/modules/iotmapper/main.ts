import {getNodeData} from "../../../helper/getNodeData";
import {toJSON} from "./toJSON";
import {addNodes, addNodesFilter} from "./addNodes";
import {addMapper} from "./addMapper";
import {addGateways} from "./addGateways";
import {addGatewayLines, addGatewayLinesFilter} from "./addGatewayLines";
import * as addToSidebar from "./addToSidebar";
import configHelper from '../../../helper/config'

export default function moduleIot(moduleConfig, leafletMap, leafletLayerControl, moduleID, generalConfig) {
    getNodeData(moduleConfig, generalConfig, function (rawNodes) {
        if (((new Date().getTime() - new Date(rawNodes.timestamp).getTime()) / 1000 / 60) > 60) {
            Materialize.toast('Problem beim Laden von ' + moduleConfig.layerName, 10000);
            console.error('Problem with loading the layer ' + moduleConfig.layerName);
        } else {
            toJSON(moduleConfig, rawNodes, function (formattedNodes) {
                let layerIoTMapperGatewaysLines = addGatewayLines(formattedNodes, leafletMap, leafletLayerControl);
                addGateways(formattedNodes, leafletMap, leafletLayerControl);
                let layerIoTMapperNodes = addNodes(formattedNodes, leafletMap, leafletLayerControl);
                addMapper(formattedNodes, leafletMap, leafletLayerControl);
                addToSidebar.addToSidebar(formattedNodes, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes, moduleID)
                configHelper.modifyModule(moduleConfig.layerName, {
                    "layerIoTMapperGatewaysLines": layerIoTMapperGatewaysLines,
                    "layerIoTMapperNodes": layerIoTMapperNodes,
                    "formattedNodes": formattedNodes
                })
            });
        }
    });
};

export function updateDataSource(moduleConfig, leafletMap) {
    const mConfCurr = moduleConfig.current;
    addNodesFilter(mConfCurr.formattedNodes, leafletMap, mConfCurr.layerIoTMapperNodes, addToSidebar.IoTMapperDevice, addToSidebar.IoTMapperGateway);
    addGatewayLinesFilter(mConfCurr.formattedNodes, leafletMap, mConfCurr.layerIoTMapperGatewaysLines, addToSidebar.IoTMapperDevice, addToSidebar.IoTMapperGateway);
}