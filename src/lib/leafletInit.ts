import * as L from 'leaflet'

export function leafletInit(config) {
    var map = L.map('map-container', {
        zoomControl: false,
        center: [50.803967, 7.204706],
        zoom: 13
    });

    L.control.zoom({
        position:'topright'
    }).addTo(map);

    L.tileLayer(config.map.layer.url, {
        attribution: config.map.layer.attribution
    }).addTo(map);
}