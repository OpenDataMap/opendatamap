import * as $ from 'jquery';
import * as M from 'materialize-css'

export function initLayerChooser(config, lMap) {
    $(function () {
        if (config.layerChooser.activated) {
            const M_Modal_elem = document.querySelector('#modal-chooseModules');
            M.Modal.init(M_Modal_elem, {
                dismissible: false,
                onCloseEnd: function () {
                    console.log('b')
                    let jsonRemember = [];
                    $('#modal-chooseModules #chooseModules-table .collection-item').each(function(i) {
                        const layerName = $(this).find('.chooseModules-table-layerName').text();
                        const checked = $(this).find('input[type=checkbox]').is(":checked");
                        jsonRemember.push({
                            "name": layerName,
                            "checked": checked
                        })
                    });
                    localStorage.setItem('rememberLayers', JSON.stringify(jsonRemember));
                    location.reload();
                }
            })
            if(localStorage.getItem('rememberLayers') === null) {
                console.log(M.Modal.getInstance(M_Modal_elem).open());
            } else {
                lMap.on('overlayadd', function (event) {
                    const rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
                    rememberLayers.forEach(function (rememberLayer) {
                        if(rememberLayer.name === event.name) {
                            rememberLayer.checked = true;
                        }
                    });
                    localStorage.setItem('rememberLayers', JSON.stringify(rememberLayers));
                });
                lMap.on('overlayremove', function (event) {
                    const rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
                    rememberLayers.forEach(function (rememberLayer) {
                        if(rememberLayer.name === event.name) {
                            rememberLayer.checked = false;
                        }
                    });
                    localStorage.setItem('rememberLayers', JSON.stringify(rememberLayers));
                })
            }
        } else {
            localStorage.removeItem('rememberLayers')
        }
    })
}
export function appendToLayerChooser(layerName, activated) {
    if (activated) {
        $('#chooseModules-table').append('<li class="collection-item">' +
            '                <span class="chooseModules-table-layerName">' + layerName + "</span>" +
            '                <div class="right">' +
            '                    <div class="switch">' +
            '                        <label>' +
            '                            Aus' +
            '                            <input checked type="checkbox">' +
            '                            <span class="lever"></span>' +
            '                            An' +
            '                        </label>' +
            '                    </div>' +
            '                </div>' +
            '            </li>')
    } else {
        $('#chooseModules-table').append('<li class="collection-item">' +
            '                <span class="chooseModules-table-layerName">' + layerName + "</span>" +
            '                <div class="right">' +
            '                    <div class="switch">' +
            '                        <label>' +
            '                            Aus' +
            '                            <input type="checkbox">' +
            '                            <span class="lever"></span>' +
            '                            An' +
            '                        </label>' +
            '                    </div>' +
            '                </div>' +
            '            </li>')
    }
}