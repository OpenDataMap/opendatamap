import * as L from 'leaflet';

export function addNodes(sourceJSON, leafletMap) {
    const nodes = sourceJSON.nodes;
    for (var node in nodes) {
        const currentNode = nodes[node];
        let nodeColorOnMap;
        if(currentNode.online) {
            nodeColorOnMap = '#1565C0';
        } else {
            nodeColorOnMap = '#C62828';
        }
        const mapNodeCircle = L.circle([currentNode.latitude, currentNode.longitude], {
            radius: 75,
            color: nodeColorOnMap,
            fillOpacity: 0.9
        }).addTo(leafletMap);

        // add Tooltip to cicle
        mapNodeCircle.bindTooltip(currentNode.name, {
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
                    mapNodeCircle.setRadius(mapNodeCircle.getRadius() * 2);
                }
            } else if (zoomDiff < 0) {
                for (var i = 0; i > zoomDiff; i--) {
                    mapNodeCircle.setRadius(mapNodeCircle.getRadius() / 2);
                }
            }
        });

        // Zoom to node by clicking on it
        mapNodeCircle.on('click', function(e: any){
            leafletMap.setView(e.latlng, 17);
        });

    }
}