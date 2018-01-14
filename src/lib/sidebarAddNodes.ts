export function sidebarAddNodes (nodeSourceList) {
    for (var nodeSource in nodeSourceList) {
        const nodes = nodeSourceList[nodeSource].nodes;
        for (var node in nodes) {
            let clients = nodes[node].statistics.clients;
            clients = Object.is(clients , undefined) ? 0 : clients
            const htmlTableRowNode =
                "<tr>" +
                "<td>" + nodes[node].nodeinfo.hostname +"</td>" +
                "<td>" + clients + "</td>" +
                "</tr>";
            $('#sidebar-bottom-nodes-tablebody').append(htmlTableRowNode);
        }
    }
}