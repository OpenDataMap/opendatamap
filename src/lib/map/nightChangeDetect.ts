import * as $ from 'jquery';

export function leafletNightChange (leafletMap) {
    leafletMap.on('baselayerchange', function(e) {
        // Check current Layer for the night Classname
        const isNightLayer = $(e.layer._container).hasClass("night");
        if(isNightLayer) {
            $('#stylesheet-night').removeAttr("media");
            $('#stylesheet-main').attr("media", "not");
        } else {
            $('#stylesheet-main').removeAttr("media");
            $('#stylesheet-night').attr("media", "not");
        }
    })
}