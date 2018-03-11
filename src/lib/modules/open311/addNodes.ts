/// <reference path="addNodes.d.ts" />

import * as L from 'leaflet';
import iconOpen311Marker from './images/opendatamap_marker_open311_48px.png';
import iconOpen311MarkerShadow from './images/opendatamap_marker_open311_shadow_48px.png';

export function addNodes(sourceJSON, leafletMap, leafletLayerNodes) {
    let layerOpen311Nodes = L.layerGroup();
    const nodes = sourceJSON.nodes;
    var iconOpen311Node = L.icon({
        iconUrl: iconOpen311Marker, // Anpassen an file-loader
        shadowUrl: iconOpen311MarkerShadow, // Anpassen an file-loader
        iconSize:     [48, 48], // size of the icon
        shadowSize:   [48, 48], // size of the shadow
        iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
        shadowAnchor: [14, 48],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    nodes.forEach((currentNode) => {
        const mapNodeMarker = L.marker([currentNode.latitude, currentNode.longitude], {icon: iconOpen311Node});
        layerOpen311Nodes.addLayer(mapNodeMarker);

        // add Tooltip to cicle
        mapNodeMarker.bindTooltip(currentNode.service_name, {
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
//                    mapGatewayCircle.setRadius(mapGatewayCircle.getRadius() * 2);
                }
            } else if (zoomDiff < 0) {
                for (var i = 0; i > zoomDiff; i--) {
//                    mapGatewayCircle.setRadius(mapGatewayCircle.getRadius() / 2);
                }
            }
        });

        // Zoom to node by clicking on it
        mapNodeMarker.on('click', function(e: any){
            leafletMap.setView(e.latlng, 17);
        });
    });
    if(sourceJSON.config.open311Nodes) {
        layerOpen311Nodes.addTo(leafletMap);
    }
    leafletLayerNodes.addOverlay(layerOpen311Nodes, sourceJSON.config.name);
}