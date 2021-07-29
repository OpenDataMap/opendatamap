/// <reference path="addMapper.d.ts" />

import * as L from 'leaflet';
import iconIoTMapperMarker from './images/opendatamap_marker_iot-mapper_48px.png';
import iconIoTMapperMarkerShadow from './images/opendatamap_marker_iot-mapper_shadow_48px.png';
import {appendToLayerChooser} from "../../layerChooser/initLayerChooser";

export function addMapper(sourceJSON, leafletMap, leafletLayerNodes) {
    let layerIoTMapperMapper = L.layerGroup();
    const mapper = sourceJSON.mapper;
    var iconIoTMapperMapper = L.icon({
        iconUrl: iconIoTMapperMarker, // Anpassen an file-loader
        shadowUrl: iconIoTMapperMarkerShadow, // Anpassen an file-loader
        iconSize:     [48, 48], // size of the icon
        shadowSize:   [48, 48], // size of the shadow
        iconAnchor:   [24, 48], // point of the icon which will correspond to marker's location
        shadowAnchor: [14, 48],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    mapper.forEach((currentMapper) => {
        if(currentMapper.showOnMap) {
            const mapMapperMarker = L.marker([currentMapper.latitude, currentMapper.longitude], {icon: iconIoTMapperMapper, zIndexOffset: 10000});
            layerIoTMapperMapper.addLayer(mapMapperMarker);

            // add Tooltip to cicle
            mapMapperMarker.bindTooltip(currentMapper.name, {
                className: 'leaflet-tooltip-node'
            });

            // Zoom to node by clicking on it
            mapMapperMarker.on('click', function(e: any){
                leafletMap.setView(e.latlng, 17);
            });
        }
    });
    if(localStorage.getItem('rememberLayers') === null) {
        if(sourceJSON.config.iotMapper) {
            layerIoTMapperMapper.addTo(leafletMap);
        }
    } else {
        const rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
        let found = false
        rememberLayers.forEach(function (rememberLayer) {
            if(rememberLayer.name === sourceJSON.config.name + " Mapper") {
                found = true;
                if (rememberLayer.checked) {
                    layerIoTMapperMapper.addTo(leafletMap);
                }
            }
        });
        if(!found) {
            rememberLayers.push({
                "name": sourceJSON.config.name,
                "checked": true
            });
            localStorage.setItem('rememberLayers', JSON.stringify(rememberLayers));
            layerIoTMapperMapper.addTo(leafletMap);
        }
    }
    appendToLayerChooser(sourceJSON.config.name + ' Mapper', sourceJSON.config.iotMapper);
    leafletLayerNodes.addOverlay(layerIoTMapperMapper, sourceJSON.config.name + " Mapper");
}