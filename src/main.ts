import 'jquery';
import 'materialize-css';
import {getNodeList} from './lib/getNodes';

// console.log($);
$.getJSON('config.json', (data) => {
    let config;
    config = data;
    $('main').removeClass('hidden');
    $(document).attr('title', config.title);
    $('#sidebar-title').html(config.title);
    const nodelist = getNodeList(config);
    console.log(nodelist);
});
