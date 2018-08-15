import * as L from 'leaflet';
import {nodeDetailOnClick} from "./initDetails";
import {appendToLayerChooser} from "../../layerChooser/initLayerChooser";

export function addNodes(sourceJSON, leafletMap, leafletLayerControl?, layerFreifunkNodes?) {
    const nodes = sourceJSON.nodes;
    if (layerFreifunkNodes !== undefined && layerFreifunkNodes !== null) {
        layerFreifunkNodes.clearLayers();
    } else {
        layerFreifunkNodes = L.layerGroup();
    }
    nodes.forEach((currentNode) => {
        if (currentNode.latitude !== 0 && currentNode.longitude !== 0) {
            let nodeColorOnMap;
            const currentTimeLastseenDiff = ((new Date().getTime() - currentNode.lastseen.getTime()) / 1000 / 60);
            if (currentTimeLastseenDiff < 15 && currentNode.online) {
                nodeColorOnMap = '#1565C0';
            } else {
                nodeColorOnMap = '#C62828';
            }
            const customMapNodeCircle = L.CircleMarker.extend({
                options: {
                    dataObj: Object
                }
            });
            const mapNodeCircle = new customMapNodeCircle([currentNode.latitude, currentNode.longitude], {
                radius: 7,
                color: nodeColorOnMap,
                fillOpacity: 0.9,
                clickable: true,
                dataObj: currentNode
            }).on('click', nodeDetailOnClick);

            // add Tooltip to cicle
            mapNodeCircle.bindTooltip(currentNode.name, {
                className: 'leaflet-tooltip-node'
            });
            layerFreifunkNodes.addLayer(mapNodeCircle);
        }
    });
    if (localStorage.getItem('rememberLayers') === null) {
        if (sourceJSON.config.standardActivated) {
            layerFreifunkNodes.addTo(leafletMap);
        }
    } else {
        const rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
        rememberLayers.forEach(function (rememberLayer) {
            if (rememberLayer.name === sourceJSON.config.name) {
                if (rememberLayer.checked) {
                    layerFreifunkNodes.addTo(leafletMap);
                }
            }
        })
    }
    if (leafletLayerControl !== undefined && leafletLayerControl !== null) {
        appendToLayerChooser(sourceJSON.config.name, sourceJSON.config.standardActivated);
        leafletLayerControl.addOverlay(layerFreifunkNodes, sourceJSON.config.name);
    }
    return layerFreifunkNodes;
}