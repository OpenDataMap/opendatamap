/// <reference path="main.d.ts" />

import 'jquery';
import 'materialize-css';
import {leafletInit} from './lib/map/leafletInit';
import * as modules from './lib/modules/modules';
import importConfig from './config.json';
const config = (importConfig as any);
// set website title
$(document).attr('title', config.title);
$('#mainSidebarTitle').html(config.title);
// Init Leaflet
leafletInit(config, (leafletMap, leafletLayerControl) => {
    // Init Config modules
    for (const moduleID in config.modules) {
        const module = config.modules[moduleID];
        modules[module.moduleName](module.config, leafletMap, leafletLayerControl, moduleID);

    }
    $('#sidebar-bottom-nodes-chooser').collapsible();
    // Init Tabs
    $('ul.tabs').tabs();
    $('#preloader').remove();
});