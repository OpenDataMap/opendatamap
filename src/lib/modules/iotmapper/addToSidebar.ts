export function addToSidebar(sourceJSON, moduleID) {
    $('#sidebar-bottom-nodes-chooser').append('' +
        '  <li id="sidebar-bottom-nodes-chooser-' + moduleID + '">' +
        '      <div class="collapsible-header"><i class="material-icons">layers</i>' + sourceJSON.config.name + '</div>' +
        '      <div class="collapsible-body">' +
        '          <table class="responsive-table">' +
        '              <thead>' +
        '                  <tr>' +
        '                      <th>Name</th>\n' +
        '                      <th>Mapping</th>\n' +
        '                  </tr>' +
        '              </thead>' +
        '              <tbody></tbody>' +
        '          </table>' +
        '     </div>' +
        '   </li>');
    sourceJSON.gateways.forEach((gateway) => {
        if(gateway.showOnSitebar) {
            $('#sidebar-bottom-nodes-chooser-' + moduleID + ' .collapsible-body table tbody').append('' +
                '<tr>' +
                '    <td>' + gateway.name + '</td>' +
                '    <td>' +
                '        <div class="switch">' +
                '            <label>' +
                '                Aus' +
                '                <input type="checkbox" checked="checked">' +
                '                <span class="lever">' +
                '                </span>' +
                '                An' +
                '            </label>' +
                '        </div>' +
                '    </td>' +
                '</tr>')
        }
    })
}