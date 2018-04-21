import * as L from 'leaflet';
import {nodeDetailOnClick} from "./initDetails";
export function addNodes(sourceJSON, leafletMap, leafletLayerControl) {
    const nodes = sourceJSON.nodes;
    let layerFreiunkNodes = L.layerGroup();
    nodes.forEach((currentNode) => {
        if(currentNode.latitude !== 0 && currentNode.longitude !== 0) {
            let nodeColorOnMap;
            const currentTimeLastseenDiff = ((new Date().getTime() - currentNode.lastseen.getTime()) / 1000 / 60);
            if(currentTimeLastseenDiff < 15 && currentNode.online) {
                nodeColorOnMap = '#1565C0';
            } else {
                nodeColorOnMap = '#C62828';
            }
            const customMapNodeCircle = L.CircleMarker.extend({
                options: {
                    dataObj: Object
                }
            });
            const mapNodeCircle = new customMapNodeCircle([currentNode.latitude, currentNode.longitude], {
                radius: 7,
                color: nodeColorOnMap,
                fillOpacity: 0.9,
                clickable: true,
                dataObj: currentNode
            }).on('click', nodeDetailOnClick);

            // add Tooltip to cicle
            mapNodeCircle.bindTooltip(currentNode.name, {
                className: 'leaflet-tooltip-node'
            });
            layerFreiunkNodes.addLayer(mapNodeCircle);
        }
    });
    layerFreiunkNodes.addTo(leafletMap);
    leafletLayerControl.addOverlay(layerFreiunkNodes, sourceJSON.config.name);
}