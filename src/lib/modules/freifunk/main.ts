import {getNodes} from "./getNodes";
import {toJSON} from "./toJSON";
import {addNodes} from "./addNodes";
import {addToSidebar} from "./addToSidebar";

export default function moduleFreifunk(moduleConfig, leafletMap, leafletLayerControl, moduleID, config) {
    getNodes(moduleConfig, config, function (rawNodes) {
        if(((new Date().getTime() - new Date(rawNodes.timestamp).getTime()) / 1000 / 60) > 60) {
            Materialize.toast('Problem beim Laden von ' + moduleConfig.layerName, 10000);
            console.error('Problem with loading the layer ' + moduleConfig.layerName);
        } else {
            toJSON(moduleConfig, rawNodes, function (formattedNodes) {
                addNodes(formattedNodes, leafletMap, leafletLayerControl);
                addToSidebar(formattedNodes, moduleID);
            });
        }
    });
};