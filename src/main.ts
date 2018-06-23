/// <reference path="main.d.ts" />

import 'jquery';
import 'materialize-css';
import {leafletInit} from './lib/map/leafletInit';
import * as modules from './lib/modules/modules';
import importConfig from './config.json';
import {initLayerChooser} from "./lib/layerChooser/initLayerChooser";
import {sidebarInit} from "./lib/sidebar/sidebarInit";
const config = (importConfig as any);
// set website title
$(document).attr('title', config.title);
$('.titleMap').html(config.title);
document.getElementById('preloader-js-enabled').classList.remove('hidden')
// Init Leaflet
leafletInit(config, (leafletMap, leafletLayerControl) => {
    // Init Config modules
    for (const moduleID in config.modules) {
        const module = config.modules[moduleID];
        modules[module.moduleName](module.config, leafletMap, leafletLayerControl, moduleID, config);

    }
    console.log(leafletMap.layerBase)
    sidebarInit(config, leafletMap);
    initLayerChooser(config, leafletMap);
    $('#preloader').remove();

    // $('#sidebar-container').remove();
    // $('#map-container').width('100vw');
    // leafletMap.invalidateSize();
    // leafletMap.layerBase.redraw();
});
