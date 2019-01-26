/// <reference path="addNodes.d.ts" />

import * as L from 'leaflet';
import iconEnvironmentMarker from './images/opendatamap_marker_environment_48px.png';
import iconEnvironmentMarkerShadow from './images/opendatamap_marker_environment_shadow_48px.png';
import {nodeDetailOnClick} from "./initDetails";
import {appendToLayerChooser} from "../../layerChooser/initLayerChooser";

export function addNodes(sourceJSON, leafletMap, leafletLayerControl?, layerEnvironmentNodes?) {
    if(layerEnvironmentNodes !== undefined && layerEnvironmentNodes !== null) {
        layerEnvironmentNodes.clearLayers();
    } else {
        layerEnvironmentNodes = L.layerGroup();
    }
    const nodes = sourceJSON.nodes;
    var iconEnvironmentNode = L.icon({
        iconUrl: iconEnvironmentMarker, // Anpassen an file-loader
        shadowUrl: iconEnvironmentMarkerShadow, // Anpassen an file-loader
        iconSize:     [48, 48], // size of the icon
        shadowSize:   [48, 48], // size of the shadow
        iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
        shadowAnchor: [14, 48],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    const customMapNodeMarker = L.Marker.extend({
        options: {
            dataObj: Object
        }
    });
    nodes.forEach((currentNode: IEnvironemntNode) => {
        const mapNodeMarker = new customMapNodeMarker([currentNode.latitude, currentNode.longitude], {
            icon: iconEnvironmentNode,
            dataObj: currentNode
        }).on('click', nodeDetailOnClick);
        layerEnvironmentNodes.addLayer(mapNodeMarker);

        // add Tooltip to cicle
        mapNodeMarker.bindTooltip(currentNode.pubId + " (" + currentNode.nodeType + ")" , {
            className: 'leaflet-tooltip-node'
        });
    });
    if(localStorage.getItem('rememberLayers') === null) {
        if(sourceJSON.config.standardActivated) {
            layerEnvironmentNodes.addTo(leafletMap);
        }
    } else {
        const rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
        let found = false;
        rememberLayers.forEach(function (rememberLayer) {
            if(rememberLayer.name === sourceJSON.config.name) {
                found = true;
                if (rememberLayer.checked) {
                    layerEnvironmentNodes.addTo(leafletMap);
                }
            }
        });
        if(!found) {
            rememberLayers.push({
                "name": sourceJSON.config.name,
                "checked": true
            });
            localStorage.setItem('rememberLayers', JSON.stringify(rememberLayers));
            layerEnvironmentNodes.addTo(leafletMap);
        }
    }
    if(leafletLayerControl !== undefined && leafletLayerControl !== null) {
        appendToLayerChooser(sourceJSON.config.name, sourceJSON.config.standardActivated);
        leafletLayerControl.addOverlay(layerEnvironmentNodes, sourceJSON.config.name);
    }
    return layerEnvironmentNodes;
}