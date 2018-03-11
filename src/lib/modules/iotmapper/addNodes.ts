import * as L from 'leaflet';
import {dBValues} from "./tools";

export function addNodes(sourceJSON, leafletMap, leafletLayerNodes) {
    const nodes = sourceJSON.nodes;
    leafletMap.createPane("iotmapperNodes");
    let layerIoTMapperNodes = L.layerGroup([], {pane: "iotmapperNodes"});
    nodes.forEach((currentNode) => {
        let nodeValues = dBValues(currentNode.dB);
        const mapNodeCircleBlur = L.circle([currentNode.latitude, currentNode.longitude], {
            radius: nodeValues.circleSize,
            color: nodeValues.colorOnMap,
            opacity: 0,
            fillOpacity: 1,
            pane: "iotmapperNodes"
        });
        layerIoTMapperNodes.addLayer(mapNodeCircleBlur);
        const mapNodeCircle = L.circle([currentNode.latitude, currentNode.longitude], {
            radius: 25,
            color: nodeValues.colorOnMap,
            opacity: 0,
            fillOpacity: 0.5,
            pane: "iotmapperNodes"
        });
        layerIoTMapperNodes.addLayer(mapNodeCircle);

        // add Tooltip to cicle
        mapNodeCircle.bindTooltip(currentNode.name, {
            className: 'leaflet-tooltip-node'
        });

        // Settings and functions that keep the size of the nodecircle on the map
        const myZoom = {
            start: leafletMap.getZoom(),
            end: leafletMap.getZoom()
        };

        leafletMap.on('zoomstart', function (e) {
            myZoom.start = leafletMap.getZoom();
        });

        leafletMap.on('zoomend', function (e) {
            myZoom.end = leafletMap.getZoom();
            var zoomDiff = myZoom.start - myZoom.end;
            if (zoomDiff > 0) {
                for (var i = 0; i < zoomDiff; i++) {
                    mapNodeCircleBlur.setRadius(mapNodeCircleBlur.getRadius() * 2);
                    mapNodeCircle.setRadius(mapNodeCircle.getRadius() * 2);
                }
            } else if (zoomDiff < 0) {
                for (var i = 0; i > zoomDiff; i--) {
                    mapNodeCircleBlur.setRadius(mapNodeCircleBlur.getRadius() / 2);
                    mapNodeCircle.setRadius(mapNodeCircle.getRadius() / 2);
                }
            }
        });

        // Zoom to node by clicking on it
        mapNodeCircle.on('click', function(e: any){
            leafletMap.setView(e.latlng, 17);
        });
    })
    if(sourceJSON.config.iotNodes) {
        layerIoTMapperNodes.addTo(leafletMap);
    }
    leafletLayerNodes.addOverlay(layerIoTMapperNodes, sourceJSON.config.name + " Nodes");
    leafletMap.getPane("iotmapperNodes").style.opacity = 0.6;
}