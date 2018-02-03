import * as L from 'leaflet';
import {dBColor} from "./tools";

export function addGateways(sourceJSON, leafletMap, leafletLayerNodes) {
    let layerIoTMapperGateways = L.layerGroup();
    const gateways = sourceJSON.gateways;
    gateways.forEach((currentGateway) => {
        let gatewayColorOnMap;
        gatewayColorOnMap = '#009ee0';
        const mapGatewayCircle = L.circle([currentGateway.latitude, currentGateway.longitude], {
            radius: 200,
            weight: 3,
            color: gatewayColorOnMap,
            opacity: 0.9,
            fillOpacity: 0.5
        });
        layerIoTMapperGateways.addLayer(mapGatewayCircle);

        // add Tooltip to cicle
        mapGatewayCircle.bindTooltip(currentGateway.name, {
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
                    mapGatewayCircle.setRadius(mapGatewayCircle.getRadius() * 2);
                }
            } else if (zoomDiff < 0) {
                for (var i = 0; i > zoomDiff; i--) {
                    mapGatewayCircle.setRadius(mapGatewayCircle.getRadius() / 2);
                }
            }
        });

        // Zoom to node by clicking on it
        mapGatewayCircle.on('click', function(e: any){
            leafletMap.setView(e.latlng, 17);
        });
    });
    layerIoTMapperGateways.addTo(leafletMap);
    leafletLayerNodes.addOverlay(layerIoTMapperGateways, sourceJSON.config.name + " Gateways");
}