import './INode';
import * as $ from 'jquery';
import importModConfig from './moduleConfig.json';
import importConfig from './../../../config.json';
const modConfig = (importModConfig as any);
const config = (importConfig as any);

export function nodeDetailOnClick(e) {
    const leafletMap = this._map;
    let actualCenter = leafletMap.getCenter();
    let actualZoom = leafletMap.getZoom();
    leafletMap.setView(this._latlng, 17);
    $('#sidebar-details-close').on("click", function () {
       $('#sidebar-details').addClass('hidden');
       $('#sidebar-main').removeClass('hidden');
        $('#sidebar-main-bottom-smallerBigger').removeClass('hidden');
        leafletMap.setView(actualCenter, actualZoom);
    });
    const nodedata = <INode> this.options.dataObj;
    let online = nodedata.online;
    const statusString = "Letzte Meldung: " + nodedata.lastseen.getHours() + ":" + nodedata.lastseen.getMinutes() + ":" + nodedata.lastseen.getSeconds() +  " - " + nodedata.lastseen.getDate() + "." + nodedata.lastseen.getMonth() + "." + nodedata.lastseen.getFullYear();
    let statusColor = "";
    const currentTimeLastseenDiff = ((new Date().getTime() - nodedata.lastseen.getTime()) / 1000 / 60);
    if (currentTimeLastseenDiff < 5 && nodedata.online) {
        statusColor = "#33691e"
    } else if (currentTimeLastseenDiff > 5 && currentTimeLastseenDiff < 15 && nodedata.online) {
        statusColor = "#f57f17";
    } else {
        statusColor = "#b71c1c";
        online = false;
    }
    $('#sidebar-details-title').html(nodedata.name.toString());
    $('#sidebar-main-bottom-smallerBigger').addClass('hidden');
    let siteName = nodedata.siteName;
    modConfig.siteNames.forEach(function (configSiteName) {
        if (configSiteName.site === siteName) {
            siteName = configSiteName.translatedName;
        }
    });
    let autoupdaterString = "deaktiviert";
    if (nodedata.autoupdater) {
        autoupdaterString = "aktiviert";
    }
    let gatewayString = "", clientsString = "", statisticsString = "";
    if(online) {
        gatewayString =
            '<tr>' +
                '<th>Gateway</th>' +
                '<td>' + nodedata.gateway + '</td>' +
            '</tr>';
        clientsString =
            '<tr>' +
                '<th>Clients</th>' +
                '<td>' + nodedata.clients + '</td>' +
            '</tr>';
        statisticsString =
            '<tr>' +
                '<th>Arbeitsspeicher</th>' +
                '<td>' +
                    '<div class="progress">' +
                        '<div class="determinate" style="width: ' + (Math.round(nodedata.memoryUsage * 100) / 100).toString() + '%"></div>\n' +
                    '</div>' +
                '</td>' +
            '</tr>' +
            '<tr>' +
                '<th>Systemlast</th>' +
                '<td>' +
                    '<div class="progress">' +
                        '<div class="determinate" style="width: ' + (Math.round(nodedata.load * 100) / 100).toString() + '%"></div>\n' +
                    '</div>' +
                '</td>' +
            '</tr>' +
            '<tr>' +
                '<th>Uptime</th>' +
                '<td>' +
                   Math.round((Math.round(nodedata.uptime / 3600) / 24) * 10) / 10 + ' Tage' +
                '</td>' +
            '</tr>'

    }
    $('#sidebar-details-infotable').empty();
    $('#sidebar-details-infotable').append('<tbody>' +
        '<tr>' +
            '<th>Status</th>' +
            '<td style="color: ' + statusColor + '; font-weight: bold">' + statusString + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Position</th>' +
            '<td><a target="_blank" href="https://www.openstreetmap.org/?mlat=' + nodedata.latitude + '&mlon=' + nodedata.longitude + '#map=18/' + nodedata.latitude +'/' + nodedata.longitude + '">' + nodedata.latitude + '/' + nodedata.longitude + '</a></td>' +
        '</tr>' +
        '<tr>' +
            '<th>ID</th>' +
            '<td>' + nodedata.nodeID + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Hardware</th>' +
            '<td>' + nodedata.hardware + '</td>' +
        '</tr>' +
        clientsString +
        '<tr>' +
            '<th>Kontakt</th>' +
            '<td>' + nodedata.contact + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>IP-Adressen</th>' +
            '<td>' + nodedata.ipAdresses.join("<br />") + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Site</th>' +
            '<td>' + siteName + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Firmware</th>' +
            '<td>' + nodedata.firmwareRelease + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Autoupdater</th>' +
            '<td>' + autoupdaterString + '</td>' +
        '</tr>' +
        gatewayString +
        statisticsString +
        '</tbody>');
    $('#sidebar-main').addClass('hidden');
    $('#sidebar-details').removeClass('hidden');
}