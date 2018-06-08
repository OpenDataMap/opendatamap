export function minimizeSidebar(leafletMap) {
    const $sidebar_container = $('#sidebar-container');
    const $sidebar_main = $('#sidebar-main');
    const $sidebar_smallerBigger = $('#sidebar-main-bottom-smallerBigger');
    const $leafletMap = $('#map-container');
    const $sidebar_smallerBigger_smaller = $('#sidebar-main-bottom-smallerBigger-smaller');
    const $sidebar_smallerBigger_larger = $('#sidebar-main-bottom-smallerBigger-larger');
    $sidebar_smallerBigger_smaller.on('click', () => {
        $sidebar_container.addClass('close');
        $sidebar_main.addClass('hidden');
        $leafletMap.addClass('smallSidebar');
        leafletMap.invalidateSize();
        $sidebar_smallerBigger.removeClass('open');
        $sidebar_smallerBigger.addClass('close');
        $sidebar_smallerBigger_smaller.addClass('hidden');
        $sidebar_smallerBigger_larger.removeClass('hidden');
    });
    $sidebar_smallerBigger_larger.on('click', () => {
        $sidebar_container.removeClass('close');
        $sidebar_main.removeClass('hidden');
        $leafletMap.removeClass('smallSidebar');
        leafletMap.invalidateSize();
        $sidebar_smallerBigger.removeClass('close');
        $sidebar_smallerBigger.addClass('open');
        $sidebar_smallerBigger_larger.addClass('hidden');
        $sidebar_smallerBigger_smaller.removeClass('hidden');
    });
}