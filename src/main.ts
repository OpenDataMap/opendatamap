import 'jquery';
import 'materialize-css';
import {getNodeList} from './lib/getNodes';
import {leafletInit} from './lib/leafletInit';
import {initSidebarHeadStats} from './lib/initSidebarHeadStats';
import {mapAddNodes} from './lib/mapAddNodes';
import {sidebarAddNodes} from './lib/sidebarAddNodes';

$.getJSON('config.json', (config) => {
    // set website title
    $(document).attr('title', config.title);
    $('#sidebar-title').html(config.title);

    // get list of nodes
    getNodeList(config, function (nodelist) {

        // Init Sidebar Head Stats
        initSidebarHeadStats(nodelist);
        // Add Nodes to sidebar
        sidebarAddNodes(nodelist)
        $(function () {
            $('#preloader').addClass('hidden');
            $('main').removeClass('hidden');
            // Init Leaflet
            const leafletMap = leafletInit(config);
            // Add Nodes To Map
            mapAddNodes(leafletMap, nodelist, config);
            $('ul.tabs').tabs()
        })
    });
});
