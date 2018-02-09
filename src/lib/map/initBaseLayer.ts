import * as L from "leaflet";

export function leafletInitBaseLayer(config, layerControl, leafletMap) {
    const configLayer = config.map.layer;
    for (const layerID in configLayer) {
        const currentLayer = configLayer[layerID];
        let leafletTileLayer;
        if(currentLayer.night) {
            // if the night attribute is true add the night classname to the tilelayer
            leafletTileLayer = L.tileLayer(currentLayer.url, {
                attribution: currentLayer.attribution,
                className: "night"
            });
        } else {
            leafletTileLayer = L.tileLayer(currentLayer.url, {
                attribution: currentLayer.attribution,
            });
        }

        // Add to layerControl
        layerControl.addBaseLayer(leafletTileLayer, currentLayer.name);

        // If it's the first layer in config set it as default;
        if (layerID === "0") {
            leafletTileLayer.addTo(leafletMap);
        }
    }
}