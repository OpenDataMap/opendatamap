export function addToSidebar(sourceJSON, moduleID) {
    $('#sidebar-bottom-nodes-chooser').append('' +
        '  <li id="sidebar-bottom-nodes-chooser-' + moduleID + '">' +
        '      <div class="collapsible-header"><i class="material-icons">layers</i>' + sourceJSON.config.name + '</div>' +
        '      <div class="collapsible-body">' +
        '          <table id="iotmapper-gateways" class="responsive-table">' +
        '              <thead>' +
        '                  <tr>' +
        '                      <th>Gateways</th>\n' +
        '                      <th>Anzeigen</th>\n' +
        '                  </tr>' +
        '              </thead>' +
        '              <tbody></tbody>' +
        '          </table>' +
        '          <br />' +
        '          <table id="iotmapper-devices" class="responsive-table">' +
        '              <thead>' +
        '                  <tr>' +
        '                      <th>Devices</th>\n' +
        '                      <th>Anzeigen</th>\n' +
        '                  </tr>' +
        '              </thead>' +
        '              <tbody></tbody>' +
        '          </table>' +
        '     </div>' +
        '   </li>');
    sourceJSON.gateways.forEach((gateway) => {
        if(gateway.showOnSitebar) {
            $('#iotmapper-gateways tbody').append('' +
                '<tr>' +
                '    <td>' + gateway.name + '</td>' +
                '    <td>' +
                '        <div class="switch">' +
                '            <label>' +
                '                Aus' +
                '                <input disabled type="checkbox" checked="checked">' +
                '                <span class="lever">' +
                '                </span>' +
                '                An' +
                '            </label>' +
                '        </div>' +
                '    </td>' +
                '</tr>')
        }
    })
    sourceJSON.mapper.forEach((mapper) => {
        $('#iotmapper-devices tbody').append('' +
            '<tr>' +
            '    <td>' + mapper.name + '</td>' +
            '    <td>' +
            '        <div class="switch">' +
            '            <label>' +
            '                Aus' +
            '                <input disabled type="checkbox" checked="checked">' +
            '                <span class="lever">' +
            '                </span>' +
            '                An' +
            '            </label>' +
            '        </div>' +
            '    </td>' +
            '</tr>')
    })
}