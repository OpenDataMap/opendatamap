import * as $ from 'jquery';

export function addToSidebar(sourceJSON, moduleID) {
    $('#sidebar-bottom-nodes-chooser').append('' +
        '  <li id="sidebar-bottom-nodes-chooser-' + moduleID + '">' +
        '      <div class="collapsible-header"><i class="material-icons">layers</i>' + sourceJSON.config.name + '</div>' +
        '      <div class="collapsible-body">' +
        '          <table>' +
        '              <thead>' +
        '                  <tr>' +
        '                      <th>offene Anliegen</th>\n' +
        '                  </tr>' +
        '              </thead>' +
        '              <tbody></tbody>' +
        '          </table>' +
        '     </div>' +
        '   </li>');
    sourceJSON.nodes.forEach((node) => {
        $('#sidebar-bottom-nodes-chooser-' + moduleID + ' .collapsible-body table tbody').append('' +
            '<tr>' +
            '    <td>' + node.service_name + '</td>' +
            '</tr>')
    })
}