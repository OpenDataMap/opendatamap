import * as L from 'leaflet';
import {dBValues, geoDistance} from "./tools";
import {appendToLayerChooser} from "../../layerChooser/initLayerChooser";

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
    });
    if(localStorage.getItem('rememberLayers') === null) {
        if(sourceJSON.config.iotGatewayLines) {
            layerIoTMapperGatewaysLines.addTo(leafletMap);
        }
    } else {
        const rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
        rememberLayers.forEach(function (rememberLayer) {
            if(rememberLayer.name === sourceJSON.config.name + " Linien") {
                if (rememberLayer.checked) {
                    layerIoTMapperGatewaysLines.addTo(leafletMap);
                }
            }
        })
    }
    leafletLayerNodes.addOverlay(layerIoTMapperGatewaysLines, sourceJSON.config.name + " Linien");
    appendToLayerChooser(sourceJSON.config.name + ' Linien', sourceJSON.config.iotGatewayLines);
    leafletMap.getPane("iotmapperGatewayLines").style.opacity = 0.6;
    return layerIoTMapperGatewaysLines;
}


export function addGatewayLinesFilter(sourceJSON, leafletMap, layerIoTMapperGatewaysLines, IoTMapperDevice, IoTMapperGateway) {
    const nodes = sourceJSON.nodes;
    layerIoTMapperGatewaysLines.clearLayers();
    nodes.forEach((currentNode) => {
        if (IoTMapperDevice.includes(currentNode.name)) {
            currentNode.gateways.forEach((currentGateway) => {
                if(IoTMapperGateway.includes(currentGateway.name)) {
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
                }
            })
        }
    })
    if(localStorage.getItem('rememberLayers') === null) {
        if(sourceJSON.config.iotGatewayLines) {
            layerIoTMapperGatewaysLines.addTo(leafletMap);
        }
    } else {
        const rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
        rememberLayers.forEach(function (rememberLayer) {
            if(rememberLayer.name === sourceJSON.config.name + " Linien") {
                if (rememberLayer.checked) {
                    layerIoTMapperGatewaysLines.addTo(leafletMap);
                }
            }
        })
    }
}