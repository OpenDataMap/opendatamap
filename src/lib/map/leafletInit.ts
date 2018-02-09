import * as L from 'leaflet';
import {leafletInitBaseLayer} from "./initBaseLayer";
import {leafletNightChange} from "./nightChangeDetect";

export function leafletInit(config, callback: Function) {

    const map = L.map('map-container', {
        zoomControl: false,
        center: config.map.center,
        zoom: 13,
        minZoom: config.map.minZoom,
        maxZoom: config.map.maxZoom
    });

    // Add Leaflet Zoom Buttons to map
    L.control.zoom({
        position: 'topright',
    }).addTo(map);

    // Init Leaflet LayerControl
    let layerControl = L.control.layers({},{},{
        position: 'bottomright',
    }).addTo(map);

    // Add Leaflet BaseLayer
    leafletInitBaseLayer(config, layerControl, map)

    // Change The Icon of the Leaflet Layer Toogle to a material Icon
    $('.leaflet-control-layers-toggle').html('<i class="material-icons">layers</i>');

    leafletNightChange(map);

    callback(map, layerControl)
}