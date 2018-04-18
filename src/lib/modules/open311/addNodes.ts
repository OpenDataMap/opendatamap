/// <reference path="addNodes.d.ts" />

import * as L from 'leaflet';
import iconOpen311Marker from './images/opendatamap_marker_open311_48px.png';
import iconOpen311MarkerShadow from './images/opendatamap_marker_open311_shadow_48px.png';
import {nodeDetailOnClick} from "./initDetails";

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
    const customMapNodeMarker = L.Marker.extend({
        options: {
            dataObj: Object
        }
    });
    nodes.forEach((currentNode) => {
        const mapNodeMarker = new customMapNodeMarker([currentNode.latitude, currentNode.longitude], {
            icon: iconOpen311Node,
            dataObj: currentNode
        }).on('click', nodeDetailOnClick);
        layerOpen311Nodes.addLayer(mapNodeMarker);

        // add Tooltip to cicle
        mapNodeMarker.bindTooltip(currentNode.service_name, {
            className: 'leaflet-tooltip-node'
        });
    });
    if(sourceJSON.config.open311Nodes) {
        layerOpen311Nodes.addTo(leafletMap);
    }
    leafletLayerNodes.addOverlay(layerOpen311Nodes, sourceJSON.config.name);
}