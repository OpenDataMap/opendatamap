import * as L from 'leaflet';

export function addNodes(sourceJSON, leafletMap) {
    const nodes = sourceJSON.nodes;
    for (var node in nodes) {
        const currentNode = nodes[node];
        let nodeColorOnMap;
        if(currentNode.dB <= -60 && currentNode.dB >= -69) {
            nodeColorOnMap = '#CC8822';
        } else if(currentNode.dB <= -70 && currentNode.dB >= -79) {
            nodeColorOnMap = '#888822';
        } else if(currentNode.dB <= -80 && currentNode.dB >= -89) {
            nodeColorOnMap = '#88CC22';
        } else if(currentNode.dB <= -90 && currentNode.dB >= -99) {
            nodeColorOnMap = '#22CC22';
        } else if(currentNode.dB <= -100 && currentNode.dB >= -109) {
            nodeColorOnMap = '#22CC88';
        } else if(currentNode.dB <= -110 && currentNode.dB >= -119) {
            nodeColorOnMap = '#228888';
        } else if(currentNode.dB <= -120 && currentNode.dB >= -129) {
            nodeColorOnMap = '#2288CC';
        } else if(currentNode.dB <= -130 && currentNode.dB >= -139) {
            nodeColorOnMap = '#2222CC';
        } else {
            nodeColorOnMap = '#CC2222';
        }

        const mapNodeCircleBlur = L.circle([currentNode.latitude, currentNode.longitude], {
            radius: 150,
            color: nodeColorOnMap,
            opacity: 0,
            fillOpacity: 0.3
        }).addTo(leafletMap);

        const mapNodeCircle = L.circle([currentNode.latitude, currentNode.longitude], {
            radius: 25,
            color: nodeColorOnMap,
            opacity: 0,
            fillOpacity: 0.5
        }).addTo(leafletMap);

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
    }
    const gateways = sourceJSON.gateways;
    for (var gateway in gateways) {
        const currentGateway = gateways[gateway];
        let gatewayColorOnMap;
        gatewayColorOnMap = '#888888';

        const mapGatewayCircle = L.circle([currentGateway.latitude, currentGateway.longitude], {
            radius: 200,
            color: gatewayColorOnMap,
            fillOpacity: 0.9
        }).addTo(leafletMap);

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
    }
}