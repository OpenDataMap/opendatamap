import {getNodeData} from "../../../helper/getNodeData";
import {toJSON} from "./toJSON";
import {addNodes} from "./addNodes";
import {addToSidebar} from "./addToSidebar";
import configHelper from "../../../helper/config";

export default function moduleFreifunk(moduleConfig, leafletMap, leafletLayerControl, moduleID, config) {
    getNodeData(moduleConfig, config, function (rawNodes) {
        if(((new Date().getTime() - new Date(rawNodes.timestamp).getTime()) / 1000 / 60) > 60) {
            Materialize.toast('Problem beim Laden von ' + moduleConfig.layerName, 10000);
            console.error('Problem with loading the layer ' + moduleConfig.layerName);
            } else {
            toJSON(moduleConfig, rawNodes, function (formattedNodes) {
                const layerNodes = addNodes(formattedNodes, leafletMap, leafletLayerControl);
                configHelper.modifyModule(moduleConfig.layerName, {
                    "layerFreifunkNodes": layerNodes
                });
                addToSidebar(formattedNodes, moduleID);
            });
        }
    });
};
export function updateDataSource(moduleConfig, generalConfig, leafletMap) {
    const mConfCurr = moduleConfig.current;
    getNodeData(moduleConfig.config,  generalConfig, function (rawNodes) {
        toJSON(moduleConfig.config, rawNodes, function (formattedNodes) {
            addNodes(formattedNodes, leafletMap, null, mConfCurr.layerFreifunkNodes)
        })
    });
}