export function leafletNightChange (leafletMap) {
    leafletMap.on('baselayerchange', function(e) {
        // Check current Layer for the night Classname
        const isNightLayer = $(e.layer._container).hasClass("night");
        if(isNightLayer) {
            $('#stylesheet-main').attr("media", "not");
            $('#stylesheet-night').removeAttr("media");
        } else {
            $('#stylesheet-night').attr("media", "not");
            $('#stylesheet-main').removeAttr("media");
        }
    })
}