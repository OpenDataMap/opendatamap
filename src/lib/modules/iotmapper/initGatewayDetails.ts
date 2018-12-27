import './IGateway';
import * as $ from 'jquery';

export function gatewayDetailOnClick(e, moduleConfig) {
    const leafletMap = e.target._map;
    let actualCenter = leafletMap.getCenter();
    let actualZoom = leafletMap.getZoom();
    leafletMap.setView(e.target._latlng, 17);
    $('#sidebar-details-close').on("click", function () {
        $('#sidebar-details').addClass('hidden');
        $('#sidebar-main').removeClass('hidden');
        $('#sidebar-main-bottom-smallerBigger').removeClass('hidden');
        leafletMap.setView(actualCenter, actualZoom);
    });
    const gatewaydata = <IIoTMapperGateway> e.target.options.dataObj;
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
                '<iframe src="' + moduleConfig.iotGatewayStats_systemlast + '&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">Speicherauslastung' +
            '<p>' +
                '<iframe src="' + moduleConfig.iotGatewayStats_speicherauslastung + '&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>'+
        '<tr>' +
            '<th colspan="2">Prozesse' +
            '<p>' +
                '<iframe src="' + moduleConfig.iotGatewayStats_prozesse + '&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">Netzwerklast' +
            '<p>' +
                '<iframe src="' + moduleConfig.iotGatewayStats_netzwerklast + '&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">Gateway Stats' +
            '<p>' +
                '<iframe src="' + moduleConfig.iotGatewayStats_gatewaystats + '&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
            '</p>' +
            '</th>' +
        '</tr>' +
        '<tr>' +
            '<th colspan="2">CPU Temperatur' +
            '<p>' +
                '<iframe src="' + moduleConfig.iotGatewayStats_cputemperatur + '&from' + dFrom + '&to' + dTo + '&var-gateway_name=' + gatewaydata.name.toString() + '" width="400" height="250" frameborder="0"></iframe>' +
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