import * as L from 'leaflet';
import {dBValues} from "./tools";

export function addNodes(sourceJSON, leafletMap, leafletLayerNodes) {
    const nodes = sourceJSON.nodes;
    leafletMap.createPane("iotmapperNodes");
    let layerIoTMapperNodes = L.layerGroup([], {pane: "iotmapperNodes"});
    nodes.forEach((currentNode) => {
        let nodeValues = dBValues(currentNode.dB);
        const mapNodeCircleBlur = L.circleMarker([currentNode.latitude, currentNode.longitude], {
            radius: nodeValues.circleSize,
            color: nodeValues.colorOnMap,
            opacity: 0,
            fillOpacity: 1,
            pane: "iotmapperNodes"
        });
        layerIoTMapperNodes.addLayer(mapNodeCircleBlur);

        // add Tooltip to cicle
        mapNodeCircleBlur.bindTooltip(currentNode.name, {
            className: 'leaflet-tooltip-node'
        });

        // Zoom to node by clicking on it
        mapNodeCircleBlur.on('click', function(e: any){
            leafletMap.setView(e.latlng, 17);
        });
    })
    if(sourceJSON.config.iotNodes) {
        layerIoTMapperNodes.addTo(leafletMap);
    }
    leafletLayerNodes.addOverlay(layerIoTMapperNodes, sourceJSON.config.name + " Nodes");
    leafletMap.getPane("iotmapperNodes").style.opacity = 0.6;
}