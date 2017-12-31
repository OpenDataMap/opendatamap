import * as L from 'leaflet';

export function mapAddNodes(leafletMap, nodelist, config) {
    for (var key in nodelist) {
        const nodes = nodelist[key].nodes;
        for (var node in nodes) {
            const nodeLocation = nodes[node].nodeinfo.location;
            if (nodeLocation !== undefined) {
                const nodeflags = nodes[node].flags;
                const hostname = nodes[node].nodeinfo.hostname;

                // define color which has the node circle on the map
                let color;
                const nodeFirstSeen = Math.round(new Date(nodes[node].firstseen).getTime() / 1000);
                const currentDate = Math.round(new Date().getTime() / 1000);
                if (nodeflags.online) {
                    if (currentDate - config.map.newNodeBreakpoint < nodeFirstSeen) {
                        color = '#43A047';
                    } else {
                        color = '#1565C0';
                    }
                } else {
                    color = '#C62828';
                }

                // Add circle for node on map.
                const mapNodeCircle = L.circle([nodeLocation.latitude, nodeLocation.longitude], {
                    radius: 35,
                    color: color,
                    fillOpacity: 0.9
                }).addTo(leafletMap);

                // add Tooltip to cicle
                mapNodeCircle.bindTooltip(hostname, {
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
                mapNodeCircle.on('click', function(e){
                    leafletMap.setView(e.latlng, 17);
                });
            }
        }
    }
}