import * as L from 'leaflet';
import {dBValues, geoDistance} from "./tools";

export function addGatewayLines(sourceJSON, leafletMap, leafletLayerNodes) {
    const nodes = sourceJSON.nodes;
    leafletMap.createPane("iotmapperGatewayLines");
    let layerIoTMapperGatewaysLines = L.layerGroup([], {pane: "iotmapperGatewayLines"});
    nodes.forEach((currentNode) => {
        currentNode.gateways.forEach((currentGateway) => {
            let gatewayValues = dBValues(currentGateway.dB);
            const mapGatewayPolyline = L.polyline([[currentNode.latitude, currentNode.longitude],[currentGateway.latitude, currentGateway.longitude]], {
                weight: 5,
                color: gatewayValues.colorOnMap,
                opacity: 1,
                pane: "iotmapperGatewayLines"
            });
            layerIoTMapperGatewaysLines.addLayer(mapGatewayPolyline);
            // add Tooltip to line
            mapGatewayPolyline.bindTooltip("Distanz: "+Math.round(geoDistance(currentNode.latitude, currentNode.longitude, currentGateway.latitude, currentGateway.longitude)).toLocaleString()+"m", {
                className: 'leaflet-tooltip-node'
            });
        });
    })
    if(sourceJSON.config.gatewayLines) {
        layerIoTMapperGatewaysLines.addTo(leafletMap);
    }
    leafletLayerNodes.addOverlay(layerIoTMapperGatewaysLines, sourceJSON.config.name + " Linien");
    leafletMap.getPane("iotmapperGatewayLines").style.opacity = 0.6;

}