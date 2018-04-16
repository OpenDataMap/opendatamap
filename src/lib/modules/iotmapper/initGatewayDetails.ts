import './IGateway';
//import importModConfig from './moduleConfig.json';
import importConfig from './../../../config.json';
import * as L from 'leaflet';
//const modConfig = (importModConfig as any);
const config = (importConfig as any);

export function gatewayDetailOnClick(e) {
    const leafletMap = this._map;
    $('#sidebar-details-close').on("click", function () {
       $('#sidebar-details').addClass('hidden');
       $('#sidebar-main').removeClass('hidden');
        leafletMap.setView(config.map.center, 13);
    });
    const gatewaydata = <IIoTMapperGateway> this.options.dataObj;
    $('#sidebar-details-title').html(gatewaydata.name.toString());
    let gatewayName = gatewaydata.name;
    let gatewayString = "", statisticsString = "";
    let d = new Date();
    let dTo = d.getTime();
    let dFrom = dTo-1440000;

    gatewayString =
            '<tr>' +
                '<th>Gateway</th>' +
                '<td>' + gatewaydata.name + '</td>' +
            '</tr>';
    statisticsString =
        '<tr>' +
            '<th colspan="2">Systemlast' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?panelId=2&orgId=1&tab=metrics&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">Speicherauslastung' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?panelId=24&orgId=1&tab=metrics&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>'+
        '<tr>' +
            '<th colspan="2">Prozesse' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?panelId=16&orgId=1&tab=metrics&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">Netzwerklast' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?panelId=8&orgId=1&tab=metrics&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">Gateway Stats' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?panelId=6&orgId=1&tab=metrics&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">CPU Temperatur' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?panelId=12&orgId=1&tab=metrics&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>';
    $('#sidebar-details-infotable').empty();
    $('#sidebar-details-infotable').append('<tbody>' +
        '<tr>' +
            '<th>Position</th>' +
            '<td><a target="_blank" href="https://www.openstreetmap.org/?mlat=' + gatewaydata.latitude + '&mlon=' + gatewaydata.longitude + '#map=18/' + gatewaydata.latitude +'/' + gatewaydata.longitude + '">' + gatewaydata.latitude + '/' + gatewaydata.longitude + '</a></td>' +
        '</tr>' +
        gatewayString +
        statisticsString +
        '</tbody>');
    $('#sidebar-main').addClass('hidden');
    $('#sidebar-details').removeClass('hidden');
}