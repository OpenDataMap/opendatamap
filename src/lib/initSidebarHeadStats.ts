export function initSidebarHeadStats(nodelist) {
    let totalNodes = 0,
        totalClients = 0,
        totalOnlineNodes = 0,
        totalGateways = 0;
    for (var key in nodelist) {
        const nodes = nodelist[key].nodes;
        totalNodes += nodes.length;
        for (var node in nodes) {
            const nodestats = nodes[node].statistics;
            const nodeflags = nodes[node].flags;
            if (nodestats.clients !== undefined) {
                totalClients += nodestats.clients;
            }
            if (nodeflags.gateway == undefined && nodeflags.online) {
                totalOnlineNodes += 1;
            }
            if (nodeflags.gateway) {
                totalGateways += 1;
            }
        }
    }
    $('#sidebar-head-stats-totalnodes').html(totalNodes.toString());
    $('#sidebar-head-stats-totalclients').html(totalClients.toString());
    $('#sidebar-head-stats-onlinenodes').html(totalOnlineNodes.toString());
    $('#sidebar-head-stats-totalgateways').html(totalGateways.toString());
}