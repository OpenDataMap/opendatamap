/// <reference path="addGateways.d.ts" />

import * as L from 'leaflet';
import iconIoTGatewayMarker from './images/opendatamap_marker_iot-gateway_48px.png';
import iconIoTGatewayMarkerShadow from './images/opendatamap_marker_iot-gateway_shadow_48px.png';
import {gatewayDetailOnClick} from "./initGatewayDetails";
import {appendToLayerChooser} from "../../layerChooser/initLayerChooser";

export function addGateways(sourceJSON, leafletMap, leafletLayerNodes) {
    let layerIoTMapperGateways = L.layerGroup();
    const gateways = sourceJSON.gateways;
    var iconIoTMapperGateway = L.icon({
        iconUrl: iconIoTGatewayMarker, // Anpassen an file-loader
        shadowUrl: iconIoTGatewayMarkerShadow, // Anpassen an file-loader
        iconSize:     [48, 48], // size of the icon
        shadowSize:   [48, 48], // size of the shadow
        iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
        shadowAnchor: [14, 48],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    const customMapGatewayMarker = L.Marker.extend({
        options: {
            dataObj: Object
        }
    });
    gateways.forEach((currentGateway) => {
        const mapGatewayMarker = new customMapGatewayMarker([currentGateway.latitude, currentGateway.longitude], {
            icon: iconIoTMapperGateway,
            dataObj: currentGateway
        }).on('click', gatewayDetailOnClick);
        layerIoTMapperGateways.addLayer(mapGatewayMarker);

        // add Tooltip to cicle
        mapGatewayMarker.bindTooltip(currentGateway.name, {
            className: 'leaflet-tooltip-node'
        });
    });
    if(localStorage.getItem('rememberLayers') === null) {
        if(sourceJSON.config.iotGateways) {
            layerIoTMapperGateways.addTo(leafletMap);
        }
    } else {
        const rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
        let found = false;
        rememberLayers.forEach(function (rememberLayer) {
            if(rememberLayer.name === sourceJSON.config.name + " Gateways") {
                if (rememberLayer.checked) {
                    found = true;
                    layerIoTMapperGateways.addTo(leafletMap);
                }
            }
        })
        if(!found) {
            rememberLayers.push({
                "name": sourceJSON.config.name,
                "checked": true
            });
            localStorage.setItem('rememberLayers', JSON.stringify(rememberLayers));
            layerIoTMapperGateways.addTo(leafletMap);
        }
    }
    appendToLayerChooser(sourceJSON.config.name + ' Gateways', sourceJSON.config.iotGateways);
    leafletLayerNodes.addOverlay(layerIoTMapperGateways, sourceJSON.config.name + " Gateways");
}