import * as L from 'leaflet';
import {dBValues} from "./tools";

export function addGatewayLines(sourceJSON, leafletMap, leafletLayerNodes) {
    const nodes = sourceJSON.nodes;
    let layerIoTMapperGatewaysLines = L.layerGroup();
    nodes.forEach((currentNode) => {
        currentNode.gateways.forEach((currentGateway) => {
            let gatewayValues = dBValues(currentGateway.dB);
            const mapGatewayPolyline = L.polyline([[currentNode.latitude, currentNode.longitude],[currentGateway.latitude, currentGateway.longitude]], {
                weight: 5,
                color: gatewayValues.colorOnMap,
                opacity: 0.5
            });
            layerIoTMapperGatewaysLines.addLayer(mapGatewayPolyline);
        });
    })
    layerIoTMapperGatewaysLines.addTo(leafletMap);
    leafletLayerNodes.addOverlay(layerIoTMapperGatewaysLines, sourceJSON.config.name + " Linien");
}