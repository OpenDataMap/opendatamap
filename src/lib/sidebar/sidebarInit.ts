import {minimizeSidebar} from "./minimizeSidebar";

export function sidebarInit(config, leafletMap) {
    minimizeSidebar(leafletMap);
    // Init Collapsible LayerChooser
    $('#sidebar-bottom-nodes-layerChooser').collapsible();
    // Init Tabs
    $('ul.tabs').tabs();


}