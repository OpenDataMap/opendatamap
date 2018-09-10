import './IGateway';
//import importModConfig from './moduleConfig.json';
import importConfig from './../../../config.json';
import * as $ from 'jquery';
//const modConfig = (importModConfig as any);
const config = (importConfig as any);

export function gatewayDetailOnClick(e) {
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
    const gatewaydata = <IIoTMapperGateway> this.options.dataObj;
    $('#sidebar-details-title').html(gatewaydata.name.toString());
    $('#sidebar-main-bottom-smallerBigger').addClass('hidden');
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
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?orgId=2&panelId=2&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">Speicherauslastung' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?orgId=2&panelId=24&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>'+
        '<tr>' +
            '<th colspan="2">Prozesse' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?orgId=2&panelId=16&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">Netzwerklast' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?orgId=2&panelId=8&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">Gateway Stats' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?orgId=2&panelId=6&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">CPU Temperatur' +
            '<p>' +
                '<iframe src="https://grafana.bonn.codefor.de/d-solo/ZlV_uvWmz/gateway_statistiks?orgId=2&panelId=12&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
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