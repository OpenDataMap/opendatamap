import 'jquery';
import 'materialize-css';
import {getNodeList} from './lib/getNodes';
import {leafletInit} from './lib/leafletInit';
import {initSidebarHeadStats} from './lib/initSidebarHeadStats';

$.getJSON('config.json', (data) => {
    let config;
    config = data;

    // set website title
    $('main').removeClass('hidden');
    $(document).attr('title', config.title);
    $('#sidebar-title').html(config.title);

    // get list of nodes
    getNodeList(config, function (nodelist) {

    // Init Leaflet
    leafletInit(config);

    // Init Sidebar Head Stats
    initSidebarHeadStats(nodelist)

    });
});
