/// <reference path="main.d.ts" />

import 'jquery';
import 'materialize-css';
import {leafletInit} from './lib/map/leafletInit';
import * as modules from './lib/modules/modules';
import importConfig from './config.json';
import {initLayerChooser} from "./lib/layerChooser/initLayerChooser";
const config = (importConfig as any);
// set website title
$(document).attr('title', config.title);
$('.titleMap').html(config.title);
// Init Leaflet
leafletInit(config, (leafletMap, leafletLayerControl) => {
    // Init Config modules
    for (const moduleID in config.modules) {
        const module = config.modules[moduleID];
        modules[module.moduleName](module.config, leafletMap, leafletLayerControl, moduleID, config);

    }
    $('#sidebar-bottom-nodes-layerChooser').collapsible();
    // Init Tabs
    $('ul.tabs').tabs();
    initLayerChooser(config, leafletMap);
    $('#preloader').remove();
});