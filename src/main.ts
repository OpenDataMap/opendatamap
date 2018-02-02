import 'jquery';
import 'materialize-css';
import * as L from 'leaflet';
import {leafletInit} from './lib/map/leafletInit';
import * as modules from './lib/modules/modules';


$.getJSON('config.json', (config) => {
    // set website title
    $(document).attr('title', config.title);
    $('#sidebar-title').html(config.title);
    // Init Leaflet
    leafletInit(config, (leafletMap, leafletLayerControl) => {
        // Init Config modules
        config.modules.forEach(function (module) {
            modules[module.moduleName](module.config, leafletMap, leafletLayerControl);
        });
        // Init Tabs
        $('ul.tabs').tabs();
        $('#preloader').remove();
    });
});
