import 'jquery';
import 'materialize-css';
import {leafletInit} from './lib/leafletInit';
import * as modules from './lib/modules/modules';


$.getJSON('config.json', (config) => {
    // set website title
    $(document).attr('title', config.title);
    $('#sidebar-title').html(config.title);
    $(() => {
        config.modules.forEach(function (module) {
            modules[module.moduleName](module.config, (nodes) => {
                console.log(nodes);
            });
        });
        $('#preloader').addClass('hidden');
        $('main').removeClass('hidden');
        // Init Leaflet
        const leafletMap = leafletInit(config);
        // Add Nodes To Map
        // mapAddNodes(leafletMap, nodelist, config);
        $('ul.tabs').tabs()
    });
});
