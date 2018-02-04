/// <reference path="import-images.d.ts" />

import * as L from 'leaflet';
import {dBColor} from './tools';
import iconIoTMarker from './images/opendatamap_marker_iot_48px.png'; // pfad anpassen
import iconIoTMarkerShadow from './images/opendatamap_marker_iot_shadow_48px.png'; // pfad anpassen

export function addGateways(sourceJSON, leafletMap, leafletLayerNodes) {
    let layerIoTMapperGateways = L.layerGroup();
    const gateways = sourceJSON.gateways;
    var iconIoTMapperGateway = L.icon({
        iconUrl: iconIoTMarker, // Anpassen an file-loader
        shadowUrl: iconIoTMarkerShadow, // Anpassen an file-loader
        iconSize:     [48, 48], // size of the icon
        shadowSize:   [48, 48], // size of the shadow
        iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 48],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    gateways.forEach((currentGateway) => {
        const mapGatewayMarker = L.marker([currentGateway.latitude, currentGateway.longitude], {icon: iconIoTMapperGateway});
        layerIoTMapperGateways.addLayer(mapGatewayMarker);

        // add Tooltip to cicle
        mapGatewayMarker.bindTooltip(currentGateway.name, {
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
        mapGatewayMarker.on('click', function(e: any){
            leafletMap.setView(e.latlng, 17);
        });
    });
    layerIoTMapperGateways.addTo(leafletMap);
    leafletLayerNodes.addOverlay(layerIoTMapperGateways, sourceJSON.config.name + " Gateways");
}