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
    const nodedata = <IEnvironemntNode> this.options.dataObj;
    $('#sidebar-details-title').html(nodedata.node_id.toString() + "(" + nodedata.sensor_type.toString() + ")");
    $('#sidebar-main-bottom-smallerBigger').addClass('hidden');
    $('#sidebar-details-infotable').empty();
    $('#sidebar-details-infotable').append('<tbody>' +
        '<tr>' +
            '<th>ID</th>' +
            '<td>' + nodedata.node_id + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Sensortyp</th>' +
            '<td>' + nodedata.sensor_type + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Datum (Letzte Daten)</th>' +
            '<td>' + nodedata.lastDataTimestamp + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Letzte Daten</th>' +
            '<td>' + nodedata.lastData + ' ' + nodedata.dataUnit + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Position</th>' +
            '<td><a target="_blank" href="https://www.openstreetmap.org/?mlat=' + nodedata.latitude + '&mlon=' + nodedata.longitude + '#map=18/' + nodedata.latitude +'/' + nodedata.longitude + '">' + nodedata.latitude + '/' + nodedata.longitude + '</a></td>' +
        '</tr>' +
        '<tr>' +
            '<th>Beschreibung</th>' +
            '<td>' + nodedata.description + '</td>' +
        '</tr>' +
        '</tbody>');
    $('#sidebar-main').addClass('hidden');
    $('#sidebar-details').removeClass('hidden');
}