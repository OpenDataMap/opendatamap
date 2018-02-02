import 'jquery';
import 'materialize-css';
import * as L from 'leaflet';
import {leafletInit} from './lib/map/leafletInit';
import * as modules from './lib/modules/modules';


$.getJSON('config.json', (config) => {
    // set website title
    $(document).attr('title', config.title);
    $('#sidebar-title').html(config.title);
    $(() => {
        // Init Leaflet
        const leafletMap = leafletInit(config);

        const layerControl = L.control.layers({},{},{
            position: 'bottomright',
        }).addTo(leafletMap);

        // Init Config modules
        config.modules.forEach(function (module) {
            modules[module.moduleName](module.config, leafletMap, layerControl);
        });

        // Init Tabs
        $('ul.tabs').tabs();

        $('#preloader').remove();
    });
});
