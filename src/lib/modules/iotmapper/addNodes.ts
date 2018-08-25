import * as L from 'leaflet';
import {dBValues} from "./tools";
import {appendToLayerChooser} from "../../layerChooser/initLayerChooser";

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
    if(localStorage.getItem('rememberLayers') === null) {
        if(sourceJSON.config.iotNodes) {
            layerIoTMapperNodes.addTo(leafletMap);
        }
    } else {
        const rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
        rememberLayers.forEach(function (rememberLayer) {
            if(rememberLayer.name === sourceJSON.config.name + " Nodes") {
                if (rememberLayer.checked) {
                    layerIoTMapperNodes.addTo(leafletMap);
                }
            }
        })
    }
    leafletLayerNodes.addOverlay(layerIoTMapperNodes, sourceJSON.config.name + " Nodes");
    appendToLayerChooser(sourceJSON.config.name + ' Nodes', sourceJSON.config.iotNodes);
    leafletMap.getPane("iotmapperNodes").style.opacity = 0.6;
    return layerIoTMapperNodes;
}

export function addNodesFilter(sourceJSON, leafletMap, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway) {
    const nodes = sourceJSON.nodes;
    layerIoTMapperNodes.clearLayers();
    nodes.forEach((currentNode) => {
        if (IoTMapperDevice.includes(currentNode.name)) {
            let currentGatewayHit = false;
            currentNode.gateways.forEach((currentGateway) => {
                if(IoTMapperGateway.includes(currentGateway.name)) {
                    currentGatewayHit = true;
                }
            })
            if(currentGatewayHit) {
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
            }
        }
    })
    if(localStorage.getItem('rememberLayers') === null) {
        if(sourceJSON.config.iotNodes) {
            layerIoTMapperNodes.addTo(leafletMap);
        }
    } else {
        let rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
        let found = true;
        rememberLayers.forEach(function (rememberLayer) {
            if(rememberLayer.name === sourceJSON.config.name + " Nodes") {
                if (rememberLayer.checked) {
                    found = true;
                    layerIoTMapperNodes.addTo(leafletMap);
                }
            }
        })
        if(!found) {
            rememberLayers.push({
                "name": sourceJSON.config.name,
                "checked": true
            });
            localStorage.setItem('rememberLayers', JSON.stringify(rememberLayers));
            layerIoTMapperNodes.addTo(leafletMap);
        }
    }
}