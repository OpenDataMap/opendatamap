import './INode';
import * as $ from 'jquery';
import importConfig from './../../../config.json';
import {formatDate} from "./tools";
import {nonExecutableDefinitionMessage} from "graphql/validation/rules/ExecutableDefinitions";
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
    $('#sidebar-details-title').html(nodedata.pubId.toString() + " (" + nodedata.nodeType.toString() + ")");
    $('#sidebar-main-bottom-smallerBigger').addClass('hidden');
    $('#sidebar-details-infotable').empty();
    $('#sidebar-details-infotable').append('<tbody>' +
        '<tr>' +
            '<th>ID</th>' +
            '<td>' + nodedata.pubId + '</td>' +
        '</tr>' +
        '<tr>' +
            '<th>Position</th>' +
            '<td><a target="_blank" href="https://www.openstreetmap.org/?mlat=' + nodedata.latitude + '&mlon=' + nodedata.longitude + '#map=18/' + nodedata.latitude +'/' + nodedata.longitude + '">' + nodedata.latitude + '/' + nodedata.longitude + '</a></td>' +
        '</tr>');
    if(nodedata.hasSensor) {
        $('#sidebar-details-infotable').append('<tr>' +
            '<th>Sensoren:</th>' +
            '</tr>');
        for (let sensorI in nodedata.sensors) {
            if (nodedata.sensors.hasOwnProperty(sensorI)) {
                const sensor = nodedata.sensors[sensorI];
                let sensorFirstPadding = 5;
                if (parseInt(sensorI) !== 0) {
                    sensorFirstPadding = 15
                }
                $('#sidebar-details-infotable').append('' +
                    '<tr>' +
                    '<th style="padding-left: 15px; padding-top: ' + sensorFirstPadding + 'px">Name</th>' +
                    '<td style="padding-top:  ' + sensorFirstPadding + 'px">' + sensor.sensorName + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th style="padding-left: 15px">Interval</th>' +
                    '<td>' + sensor.sensorInterval + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th style="padding-left: 15px">Nodetyp</th>' +
                    '<td>' + sensor.nodeSubType + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th style="padding-left: 15px">Sensortyp</th>' +
                    '<td>' + sensor.sensorType + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th style="padding-left: 15px">Letzte Daten</th>' +
                    '<td>' + sensor.lastData + sensor.dataFormat + '</td>' +
                    '</tr>')
            }
        }
    }
    if(nodedata.hasActuator) {
        $('#sidebar-details-infotable').append('<tr>' +
            '<th>Aktuatoren:</th>' +
            '</tr>');
        for(let actuatorI in nodedata.actuator) {
            if (nodedata.sensors.hasOwnProperty(actuatorI)) {
                const actuator = nodedata.actuator[actuatorI];
                let actuatorFirstPadding = 5;
                if(parseInt(actuatorI) !== 0) {
                    actuatorFirstPadding = 15
                }
                $('#sidebar-details-infotable').append('' +
                    '<tr>' +
                        '<th style="padding-left: 15px; padding-top: ' + actuatorFirstPadding + 'px">Name</th>' +
                        '<td style="padding-top:  ' + actuatorFirstPadding + 'px">' + actuator.actuatorName + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<th style="padding-left: 15px">Nodetyp</th>' +
                        '<td>' + actuator.nodeSubType + '</td>' +
                    '</tr>' +
                    '<tr>' +
                        '<th style="padding-left: 15px">Letzte Daten</th>' +
                        '<td>' + actuator.lastData + actuator.dataFormat + '</td>' +
                    '</tr>')
            }
        }
    }
    $('#sidebar-main').addClass('hidden');
    $('#sidebar-details').removeClass('hidden');
}