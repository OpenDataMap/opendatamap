import * as $ from 'jquery';
import {minimizeSidebar} from "./minimizeSidebar";

export function sidebarInit(config, leafletMap) {
    minimizeSidebar(leafletMap);
}