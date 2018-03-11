import {getNodes} from "./getNodes";
import {toJSON} from "./toJSON";
import {addNodes} from "./addNodes";
import {addToSidebar} from "./addToSidebar";

export default function moduleIot(moduleConfig, leafletMap, leafletLayerControl, moduleID) {
    getNodes(moduleConfig, function (rawNodes) {
        toJSON(moduleConfig, rawNodes, function (formattedNodes) {
            addNodes(formattedNodes, leafletMap, leafletLayerControl);
            addToSidebar(formattedNodes, moduleID)
        });
    });
};