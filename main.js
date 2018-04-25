const express = require("express");
const fs = require('fs');
const axios = require('axios');
const path = require("path");
const commander = require('commander');
const child_process = require('child_process');
const sass = require('node-sass');
const watch = require('recursive-watch');
const cryptojs = require('crypto-js')

commander
  .version('0.4.6')
  .description('Server for OpenDataMap')

// development server
commander
  .command('development <port>')
  .alias('dev')
  .description('server for development use')
  .action(function (port) {
    // build the assets
    console.log('Please wait! The assets were built')
    buildAssets();

    // start server
    startServer(port);

    // read config
    const config = readConfig();

    // download data source trigger
    downloadDataSourcesTrigger(config);

    console.log('start watching')
    watch('./src/', function (filename) {
      if (filename) {
        const filetype = filename.substring(filename.lastIndexOf('.') + 1);
        switch (filetype) {
          case "ts":
          case "html":
          case "json":
            buildWebpack();
            break;
          case "scss":
            buildSass();
            break;
        }
      }
    })
  })

// test server
commander
  .command('test')
  .description('test')
  .action(function() {
    buildAssets();
    const config = readConfig();
    downloadDataSources(config);
    console.log('Passed');
  })

// server for production use
commander
  .command('production <port>')
  .alias('prod')
  .description('server for production use')
  .action(function (port) {
    // build the assets
    console.log('Please wait! The assets were built')
    buildAssets();

    // read config
    const config = readConfig();

    // download data source trigger
    downloadDataSourcesTrigger(config);

    // start server
    startServer(port);
  })
// show help if no command was entered
commander.parse(process.argv)
if (commander.args.length === 0) {
  commander.help();
}

function startServer (port) {
  const server = express();
  const cors = require('cors')
  server.use(cors())

  server.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
  });
  server.get('/assets/css/light/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/css/light.css'));
  });
  server.get('/assets/css/night/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/css/night.css'));
  });
  server.get('/assets/js/main', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/bundle.js'));
  });
  server.get('/assets/fonts/roboto/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/fonts/roboto/' + req.params[ 0 ]));
  });
  server.get('/assets/images/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/images/' + req.params[ 0 ]));
  });
  server.get('/assets/data/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/data/' + req.params[0]));
  })
  server.listen(port, '0.0.0.0');

  console.log("OpenDataMap-server is listening on port " + port);
}

function buildAssets () {
  buildWebpack();
  buildSass();
  if (!fs.existsSync('dist/data')){
    fs.mkdirSync('dist/data')
  }
  console.log('The assets finished building!');
}
function buildWebpack () {
  // webpack-build
  const webpackBuild = child_process.spawnSync('node_modules/webpack/bin/webpack.js');
  if(webpackBuild.stderr.toString()) throw webpackBuild.stderr.toString();
  if(webpackBuild.stdout.toString().includes('Error') || webpackBuild.stdout.toString().includes('ERROR')) throw webpackBuild.stdout.toString();
}
function buildSass () {
  // sass build
  if (!fs.existsSync('dist/css')){
    fs.mkdirSync('dist/css')
  }
  sass.render({
    file: 'src/scss/light/main.scss',
    outputStyle: "compressed"
  }, function(err, result) {
    if(err) throw err;
    fs.writeFile('dist/css/light.css', result.css, (error) => {
      if(error) throw error;
    });
  });
  sass.render({
    file: 'src/scss/night/main.scss',
    outputStyle: "compressed"
  }, function(err, result) {
    if (err) throw err;
    fs.writeFile("dist/css/night.css", result.css, (error) => {
        if(error) throw error;
    });
  })
}
function downloadDataSources (config) {
  config.modules.forEach(function(module) {
    const dataURL = module.config.dataURL;
    let filename;
    if (dataURL.indexOf("?") === -1) {
      filename = cryptojs.MD5(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'));
    } else {
      filename = cryptojs.MD5(dataURL) + dataURL.substring(dataURL.lastIndexOf('.'), dataURL.indexOf('?'));
    }
    axios.get(dataURL, {
      responseType: 'stream'
    }).then(function (response) {
      let file = fs.createWriteStream("dist/data/" + filename);
      response.data.pipe(file);
    }).catch(function (error) {
      console.error('Error downloading ' + dataURL + ' - StatusCode: '  + error.response.status);
    })
  });
}
function downloadDataSourcesTrigger (config) {
  downloadDataSources(config);
  setInterval(downloadDataSources, 60000, config);
}
function readConfig () {
  return JSON.parse(fs.readFileSync("src/config.json"));
}
