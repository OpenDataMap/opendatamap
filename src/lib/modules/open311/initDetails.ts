import './INode';
import * as $ from 'jquery';
import importConfig from './../../../config.json';
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
    const nodedata = <IOpen311Node> this.options.dataObj;
    $('#sidebar-details-title').html(nodedata.service_name.toString());
    $('#sidebar-main-bottom-smallerBigger').addClass('hidden');
    $('#sidebar-details-infotable').empty();
    $('#sidebar-details-infotable').append('<tbody>' +
        '<tr>' +
            '<th>ID</th>' +
            '<td>' + nodedata.service_request_id + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Status</th>' +
            '<td>' + nodedata.status + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Datum (gemeldet)</th>' +
            '<td>' + nodedata.requested_datetime + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Datum (Änderung)</th>' +
            '<td>' + nodedata.updated_datetime + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Position</th>' +
            '<td><a target="_blank" href="https://www.openstreetmap.org/?mlat=' + nodedata.latitude + '&mlon=' + nodedata.longitude + '#map=18/' + nodedata.latitude +'/' + nodedata.longitude + '">' + nodedata.latitude + '/' + nodedata.longitude + '</a></td>' +
        '</tr>' +
        '<tr>' +
            '<th>Adresse</th>' +
            '<td>' + nodedata.address + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>PLZ</th>' +
            '<td>' + nodedata.zipcode + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Servicename</th>' +
            '<td>' + nodedata.service_name + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Beschreibung</th>' +
            '<td>' + nodedata.description + '</td>' +
        '</tr>' +
        '</tbody>');
    $('#sidebar-main').addClass('hidden');
    $('#sidebar-details').removeClass('hidden');
}