import {getNodes} from "./getNodes";
import {toJSON} from "./toJSON";
import {addNodes} from "./addNodes";

export default function moduleFreifunk(moduleConfig, leafletMap, leafletLayerControl) {
    getNodes(moduleConfig, function (rawNodes) {
        toJSON(moduleConfig, rawNodes, function (formattedNodes) {
            addNodes(formattedNodes, leafletMap, leafletLayerControl);
        });
    });
};