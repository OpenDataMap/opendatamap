///<reference path="addNodes.ts"/>
import {addGatewayLinesFilter} from "./addGatewayLines";
import {addNodesFilter} from "./addNodes";
import {map} from "leaflet";
import {filterByTime} from "./filterByTime";
const noUiSlider = require('../../../helper/materialize_nouislider.js');
const wnumb = require('wnumb');

export let IoTMapperGateway = [];
export let IoTMapperDevice = [];

export function addToSidebar(sourceJSON, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes, moduleID) {
    let nodesTimes: number[] = [] ;
    $('#sidebar-bottom-nodes-chooser').append('' +
        '  <li id="sidebar-bottom-nodes-chooser-' + moduleID + '">' +
        '      <div class="collapsible-header"><i class="material-icons">layers</i>' + sourceJSON.config.name + '</div>' +
        '      <div class="collapsible-body">' +
        '       <div id="iot-' + moduleID + '-time-slider"></div>' +
        '          <table id="iotmapper-gateways">' +
        '              <thead>' +
        '                  <tr>' +
        '                      <th width="65%">Gateways</th>' +
        '                      <th>Anzeigen</th>' +
        '                  </tr>' +
        '              </thead>' +
        '              <tbody></tbody>' +
        '          </table>' +
        '          <br />' +
        '          <table id="iotmapper-devices">' +
        '              <thead>' +
        '                  <tr>' +
        '                      <th width="65%">Devices</th>' +
        '                      <th>Anzeigen</th>' +
        '                  </tr>' +
        '              </thead>' +
        '              <tbody></tbody>' +
        '          </table>' +
        '     </div>' +
        '   </li>');
    sourceJSON.gateways.forEach((gateway) => {
        IoTMapperGateway.push(gateway.name);
        if (gateway.showOnSitebar) {
            $('#iotmapper-gateways tbody').append('' +
                '<tr data-name="' + gateway.name + '">' +
                '    <td>' + gateway.name + '</td>' +
                '    <td>' +
                '        <div class="switch">' +
                '            <label>' +
                '                Aus' +
                '                <input type="checkbox" checked="checked" id="' + gateway.name + '" name="' + gateway.name + '">' +
                '                <span class="lever">' +
                '                </span>' +
                '                An' +
                '            </label>' +
                '        </div>' +
                '    </td>' +
                '</tr>')
            $('#' + gateway.name).on('change', function () {
                IoTMapperGateway = IoTMapperGatewayChanged(this, sourceJSON, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway)
            });
        }
    })
    sourceJSON.mapper.forEach((mapper) => {
        IoTMapperDevice.push(mapper.name);
        $('#iotmapper-devices tbody').append('' +
            '<tr data-name="' + mapper.name + '">' +
            '    <td>' + mapper.name + '</td>' +
            '    <td>' +
            '       <div class="switch">' +
            '            <label>' +
            '                Aus' +
            '                <input type="checkbox" checked="checked" id="' + mapper.name + '" name="' + mapper.name + '">' +
            '                <span class="lever">' +
            '                </span>' +
            '                An' +
            '            </label>' +
            '        </div>' +
            '    </td>' +
            '</tr>');
        $('#' + mapper.name).on('change', function () {
            IoTMapperDevice = IoTMapperDeviceChanged(this, sourceJSON, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway)
        });
    });
    sourceJSON.nodes.forEach(function (node) {
        nodesTimes.push(new Date(node.time).getTime());
    });
    console.log(nodesTimes);
    var htmlSlider = document.getElementById('iot-' + moduleID + '-time-slider');

    let noUizedSlider = noUiSlider.create(htmlSlider, {
        start: [Math.min(...nodesTimes), Math.max(...nodesTimes)],
        connect: true,
        tooltips: false,
        step: 7 * 24 * 60 * 60 * 1000,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
            'min': Math.min(...nodesTimes),
            'max':Math.max(...nodesTimes)
        },
        format: wnumb({
            decimals: 0
        })
    });
    noUizedSlider.on('end', function (val) {
        filterByTime(sourceJSON, val, leafletMap, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway, layerIoTMapperGatewaysLines);
    })
}

function IoTMapperGatewayChanged(el, sourceJSON, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway) {
    if (el.checked) {
        IoTMapperGateway.push(el.name);
    } else {
        IoTMapperGateway = IoTMapperGateway.filter(e => e !== el.name);
    }
    addGatewayLinesFilter(sourceJSON, leafletMap, layerIoTMapperGatewaysLines, IoTMapperDevice, IoTMapperGateway);
    addNodesFilter(sourceJSON, leafletMap, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway);
    return IoTMapperGateway;
}

function IoTMapperDeviceChanged(el, sourceJSON, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway) {
    if (el.checked) {
        IoTMapperDevice.push(el.name);
    } else {
        IoTMapperDevice = IoTMapperDevice.filter(e => e !== el.name);
    }
    addGatewayLinesFilter(sourceJSON, leafletMap, layerIoTMapperGatewaysLines, IoTMapperDevice, IoTMapperGateway);
    addNodesFilter(sourceJSON, leafletMap, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway);
    return IoTMapperDevice;
}

export function addToSidebarUpdate(sourceJSON, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes) {
    sourceJSON.gateways.forEach((gateway) => {
        IoTMapperGateway.push(gateway.name);
        let currentIoTMapperGateways = [];
        $('#iotmapper-gateways tbody').children().each(function (_, v) {
            const data = $(v).data('name')
            if (data !== undefined) {
                currentIoTMapperGateways.push(data);
            }
        });
        if(!currentIoTMapperGateways.includes(gateway.name)) {
            if (gateway.showOnSitebar) {
                $('#iotmapper-gateways tbody').append('' +
                    '<tr data-name="' + gateway.name + '">' +
                    '    <td>' + gateway.name + '</td>' +
                    '    <td>' +
                    '        <div class="switch">' +
                    '            <label>' +
                    '                Aus' +
                    '                <input type="checkbox" checked="checked" id="' + gateway.name + '" name="' + gateway.name + '">' +
                    '                <span class="lever">' +
                    '                </span>' +
                    '                An' +
                    '            </label>' +
                    '        </div>' +
                    '    </td>' +
                    '</tr>')
                $('#' + gateway.name).on('change', function () {
                    IoTMapperGateway = IoTMapperGatewayChanged(this, sourceJSON, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway)
                });
            }
        }
    })
    sourceJSON.mapper.forEach((mapper) => {
        IoTMapperDevice.push(mapper.name);
        let currentIoTMapper = [];
        $('#iotmapper-devices tbody').children().each(function (_, v) {
            const data = $(v).data('name')
            if (data !== undefined) {
                currentIoTMapper.push(data);
            }
        });
        if(!currentIoTMapper.includes(mapper.name)) {
            $('#iotmapper-devices tbody').append('' +
                '<tr data-name="' + mapper.name + '">' +
                '    <td>' + mapper.name + '</td>' +
                '    <td>' +
                '        <div class="switch">' +
                '            <label>' +
                '                Aus' +
                '                <input type="checkbox" checked="checked" id="' + mapper.name + '" name="' + mapper.name + '">' +
                '                <span class="lever">' +
                '                </span>' +
                '                An' +
                '            </label>' +
                '        </div>' +
                '    </td>' +
                '</tr>');
        }

        $('#' + mapper.name).on('change', function () {
            IoTMapperDevice = IoTMapperDeviceChanged(this, sourceJSON, leafletMap, layerIoTMapperGatewaysLines, layerIoTMapperNodes, IoTMapperDevice, IoTMapperGateway)
        });
    });
}