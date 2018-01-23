import 'jquery';
import 'materialize-css';
import {leafletInit} from './lib/map/leafletInit';
import * as modules from './lib/modules/modules';
import {addNodes} from "./lib/map/addNodes";


$.getJSON('config.json', (config) => {
    // set website title
    $(document).attr('title', config.title);
    $('#sidebar-title').html(config.title);
    $(() => {
        // Init Leaflet
        const leafletMap = leafletInit(config);
        // Add Nodes To Map
        config.modules.forEach(function (module) {
            modules[module.moduleName](module.config, (source) => {
                addNodes(source, leafletMap);
            });
        });
        // Init Tabs
        $('ul.tabs').tabs();

        $('#preloader').remove();
    });
});
