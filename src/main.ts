import 'jquery';
import 'materialize-css';
import {leafletInit} from './lib/map/leafletInit';
import * as modules from './lib/modules/modules';
import {initLayerChooser} from "./lib/layerChooser/initLayerChooser";
import {sidebarInit} from "./lib/sidebar/sidebarInit";
import * as io from "socket.io-client";
import configHelper from './helper/config';

const config = configHelper.getConfig();
// set website title
$(document).attr('title', config.title);
$('.titleMap').html(config.title);
document.getElementById('preloader-js-enabled').classList.remove('hidden');
const socket = io.connect('/');
// Init Leaflet
leafletInit(config, (leafletMap, leafletLayerControl) => {
    // Init Config modules
    for (const moduleID in config.modules) {
        if (config.modules.hasOwnProperty(moduleID)) {
            const module = config.modules[moduleID];
            modules[module.moduleName](module.config, leafletMap, leafletLayerControl, moduleID, config);
        }

    }
    sidebarInit(config, leafletMap);
    initLayerChooser(config, leafletMap);
    $('#preloader').remove();
    socket.on('updatedDataSource', function (data) {
        for (const moduleID in config.modules) {
            if (config.modules.hasOwnProperty(moduleID)) {
                const module = config.modules[moduleID];
                if (module.config.layerName === data.name) {
                    modules[module.moduleName + "_updateDataSource"](module, config, leafletMap);
                }
            }
        }
    });
    // $('#sidebar-container').remove();
    // $('#map-container').width('100vw');
    // leafletMap.invalidateSize();
    // leafletMap.layerBase.redraw();
});
