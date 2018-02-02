import {getNodes} from "./getNodes";
import {toJSON} from "./toJSON";
import {addNodes} from "./addNodes";

export default function moduleIot(moduleConfig, leafletMap, layerControl) {
    getNodes(moduleConfig, function (rawNodes) {
        toJSON(moduleConfig, rawNodes, function (formattedNodes) {
            addNodes(formattedNodes, leafletMap, layerControl);
        });
    });
};