export function initSidebarHeadStats(nodelist) {
    let totalNodes = 0;
    for (var key in nodelist) {
        totalNodes = totalNodes + nodelist[key].nodes.length
    }
    $('#sidebar-head-stats-totalnodes').html(totalNodes.toString())
}