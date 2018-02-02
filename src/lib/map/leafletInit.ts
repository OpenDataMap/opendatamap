import * as L from 'leaflet';

export function leafletInit(config, callback: Function) {
    const leafletTileLayer = L.tileLayer(config.map.layer.url, {
        attribution: config.map.layer.attribution
    });
    const map = L.map('map-container', {
        zoomControl: false,
        center: config.map.center,
        zoom: 13,
        minZoom: config.map.minZoom,
        maxZoom: config.map.maxZoom,
        layers: [leafletTileLayer]
    });

    L.control.zoom({
        position: 'topright',
    }).addTo(map);

    let layerControl = L.control.layers({},{},{
        position: 'bottomright',
    }).addTo(map);

    layerControl.addBaseLayer(leafletTileLayer, "Carto");
    $('.leaflet-control-layers-toggle').html('<i class="material-icons">layers</i>');
    callback(map, layerControl)
}