import {getNodes} from "./getNodes";
import {toJSON} from "./toJSON";
import {addNodes} from "./addNodes";
import {addMapper} from "./addMapper";
import {addGateways} from "./addGateways";
import {addGatewayLines} from "./addGatewayLines";
import {addToSidebar} from "./addToSidebar";

export default function moduleIot(moduleConfig, leafletMap, leafletLayerControl, moduleID) {
    getNodes(moduleConfig, function (rawNodes) {
        toJSON(moduleConfig, rawNodes, function (formattedNodes) {
            addGatewayLines(formattedNodes, leafletMap, leafletLayerControl);
            addGateways(formattedNodes, leafletMap, leafletLayerControl);
            addNodes(formattedNodes, leafletMap, leafletLayerControl);
            addMapper(formattedNodes, leafletMap, leafletLayerControl);
            addToSidebar(formattedNodes, moduleID)
        });
    });
};