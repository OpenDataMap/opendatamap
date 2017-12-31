import 'jquery';
import 'materialize-css';
import {getNodeList} from './lib/getNodes';
import {leafletInit} from './lib/leafletInit';
import {initSidebarHeadStats} from './lib/initSidebarHeadStats';
import {mapAddNodes} from './lib/mapAddNodes';

$.getJSON('config.json', (config) => {
    // set website title
    $('main').removeClass('hidden');
    $(document).attr('title', config.title);
    $('#sidebar-title').html(config.title);

    // get list of nodes
    getNodeList(config, function (nodelist) {
        // Init Leaflet
        const leafletMap = leafletInit(config);

        // Init Sidebar Head Stats
        initSidebarHeadStats(nodelist);

        // Add Nodes To Map
        mapAddNodes(leafletMap, nodelist, config);
    });
});
