import * as L from "leaflet";

export function initLocateControl(config, leafletMap) {
    if( document.location.protocol === 'https:' || window.location.protocol === 'https:') {
        let leafletLocateControl = L.Control.extend({

            options: {
                position: 'topright',
            },

            onAdd: function (map) {
                const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-locate');

                container.onclick = function(){
                    const options = {
                        enableHighAccuracy: true,
                        maximumAge: 0
                    };

                    function success(pos) {
                        let crd = pos.coords;
                        map.setView([crd.latitude, crd.longitude], 16);
                    }

                    function error(err) {
                        console.warn(`ERROR(${err.code}): ${err.message}`);
                    }

                    navigator.geolocation.getCurrentPosition(success, error, options);
                }
                return container;
            },
        });
        let locateC = new leafletLocateControl();
        locateC.addTo(leafletMap);
        $('.leaflet-control-locate').html('<div><i class="material-icons"> my_location</i></div>');
    }
}