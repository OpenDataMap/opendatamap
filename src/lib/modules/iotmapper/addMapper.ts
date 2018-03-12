/// <reference path="addMapper.d.ts" />

import * as L from 'leaflet';
import iconIoTMapperMarker from './images/opendatamap_marker_iot-mapper_48px.png';
import iconIoTMapperMarkerShadow from './images/opendatamap_marker_iot-mapper_shadow_48px.png';

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
        const mapMapperMarker = L.marker([currentMapper.latitude, currentMapper.longitude], {icon: iconIoTMapperMapper});
        layerIoTMapperMapper.addLayer(mapMapperMarker);

        // add Tooltip to cicle
        mapMapperMarker.bindTooltip(currentMapper.name, {
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
//                    mapGatewayCircle.setRadius(mapGatewayCircle.getRadius() * 2);
                }
            } else if (zoomDiff < 0) {
                for (var i = 0; i > zoomDiff; i--) {
//                    mapGatewayCircle.setRadius(mapGatewayCircle.getRadius() / 2);
                }
            }
        });

        // Zoom to node by clicking on it
        mapMapperMarker.on('click', function(e: any){
            leafletMap.setView(e.latlng, 17);
        });
    });
    if(sourceJSON.config.iotMapper) {
        layerIoTMapperMapper.addTo(leafletMap);
    }
    leafletLayerNodes.addOverlay(layerIoTMapperMapper, sourceJSON.config.name + " Mapper");
}