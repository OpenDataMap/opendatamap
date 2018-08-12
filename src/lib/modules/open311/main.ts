import {getNodeData} from "../../../helper/getNodeData";
import {toJSON} from "./toJSON";
import {addNodes} from "./addNodes";
import {addToSidebar} from "./addToSidebar";
import configHelper from "../../../helper/config";

export default function moduleIot(moduleConfig, leafletMap, leafletLayerControl, moduleID, generalConfig) {
    getNodeData(moduleConfig, generalConfig, function (rawNodes) {
        toJSON(moduleConfig, rawNodes, function (formattedNodes) {
            const layerNodes = addNodes(formattedNodes, leafletMap, leafletLayerControl);
            configHelper.modifyModule(moduleConfig.layerName, {
                "formattedNodes": formattedNodes,
                "layerOpen311Nodes": layerNodes
            });
            addToSidebar(formattedNodes, moduleID)
        });
    });
};

export function updateDataSource(moduleConfig, leafletMap) {
    const mConfCurr = moduleConfig.current;
    addNodes(mConfCurr.formattedNodes, leafletMap, null, mConfCurr.layerOpen311Nodes)
}