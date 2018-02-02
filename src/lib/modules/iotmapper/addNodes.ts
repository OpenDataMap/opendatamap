import * as L from 'leaflet';

export function addNodes(sourceJSON, leafletMap, leafletLayerNodes) {
    let gateway;
    const nodes = sourceJSON.nodes;
    let layerIoTMapper = L.layerGroup();
    let layerIoTMapperGateways = L.layerGroup();
    let layerIoTMapperGatewaysLines = L.layerGroup();
    for (const node in nodes) {
        const currentNode = nodes[node];

        // add line from node to gateway to the map
        for (gateway in currentNode.gateways) {
            const currentGateway = currentNode.gateways[gateway];
            let gatewayColorOnMap = dBColor(currentGateway.dB);
            const mapGatewayPolyline = L.polyline([[currentNode.latitude, currentNode.longitude],[currentGateway.latitude, currentGateway.longitude]], {
                weight: 5,
                color: gatewayColorOnMap,
                opacity: 0.5
            });
            layerIoTMapperGatewaysLines.addLayer(mapGatewayPolyline);
        }

        // add node to the map
        let nodeColorOnMap = dBColor(currentNode.dB);
        const mapNodeCircleBlur = L.circle([currentNode.latitude, currentNode.longitude], {
            radius: 150,
            color: nodeColorOnMap,
            opacity: 0,
            fillOpacity: 0.3
        });
        layerIoTMapper.addLayer(mapNodeCircleBlur);
        const mapNodeCircle = L.circle([currentNode.latitude, currentNode.longitude], {
            radius: 25,
            color: nodeColorOnMap,
            opacity: 0,
            fillOpacity: 0.5
        });
        layerIoTMapper.addLayer(mapNodeCircle);

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

    // add gateways to the map
    const gateways = sourceJSON.gateways;
    for (gateway in gateways) {
        const currentGateway = gateways[gateway];

        // add gateway to the map
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
    }
    layerIoTMapper.addTo(leafletMap);
    layerIoTMapperGateways.addTo(leafletMap);
    layerIoTMapperGatewaysLines.addTo(leafletMap);
    leafletLayerNodes.addOverlay(layerIoTMapper, sourceJSON.config.name);
    leafletLayerNodes.addOverlay(layerIoTMapperGateways, sourceJSON.config.name + " Gateways");
    leafletLayerNodes.addOverlay(layerIoTMapperGatewaysLines, sourceJSON.config.name + " Lines");
}

function dBColor(dB) {
    let nodeColorOnMap;
    if(dB <= -60 && dB >= -69) {
            nodeColorOnMap = '#CC8822';
        } else if(dB <= -70 && dB >= -79) {
            nodeColorOnMap = '#888822';
        } else if(dB <= -80 && dB >= -89) {
            nodeColorOnMap = '#88CC22';
        } else if(dB <= -90 && dB >= -99) {
            nodeColorOnMap = '#22CC22';
        } else if(dB <= -100 && dB >= -109) {
            nodeColorOnMap = '#22CC88';
        } else if(dB <= -110 && dB >= -119) {
            nodeColorOnMap = '#228888';
        } else if(dB <= -120 && dB >= -129) {
            nodeColorOnMap = '#2288CC';
        } else if(dB <= -130 && dB >= -139) {
            nodeColorOnMap = '#2222CC';
        } else {
            nodeColorOnMap = '#CC2222';
        }
    return nodeColorOnMap;
}