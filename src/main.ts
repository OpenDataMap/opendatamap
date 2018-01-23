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
        // $('#preloader').addClass('hidden');
        // $('main').removeClass('hidden');
        // Init Leaflet
        const leafletMap = leafletInit(config);
        config.modules.forEach(function (module) {
            modules[module.moduleName](module.config, (source) => {
                addNodes(source, leafletMap);
            });
        });
        // Add Nodes To Map
        // mapAddNodes(leafletMap, nodelist, config);
        $('ul.tabs').tabs()
    });
});
