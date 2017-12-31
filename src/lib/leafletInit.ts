import * as L from 'leaflet';

export function leafletInit(config) {
    var map = L.map('map-container', {
        zoomControl: false,
        center: config.map.center,
        zoom: 13,
        minZoom: config.map.minZoom,
        maxZoom: config.map.maxZoom
    });

    L.control.zoom({
        position: 'topright',
    }).addTo(map);

    L.tileLayer(config.map.layer.url, {
        attribution: config.map.layer.attribution
    }).addTo(map);
    return map;
}