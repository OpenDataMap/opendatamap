const express = require("express");
const fs = require('fs');
const path = require("path");
const commander = require('commander');
const child_process = require('child_process');
const sass = require('node-sass');

commander
  .version('0.1')
  .description('Server for OpenDataMap')

// server for production use
commander
  .command('production <port>')
  .alias('prod')
  .description('server for production use')
  .action(function (port) {
    console.log('Please wait! The assets were built')

    // webpack-build
    const webpackBuild = child_process.spawnSync('node_modules/webpack/bin/webpack.js');
    if(webpackBuild.stderr.toString()) throw webpackBuild.stderr.toString()

    // sass build
    const mainSassBuild = sass.renderSync({
      file: 'src/scss/light/main.scss',
      outputStyle: "compressed"
    })
    fs.writeFileSync("dist/css/light.css", mainSassBuild.css);
    const nightSassBuild = sass.renderSync({
      file: 'src/scss/night/main.scss',
      outputStyle: "compressed"
    })
    fs.writeFileSync("dist/css/night.css", nightSassBuild.css)

    console.log('The assets finished building. The server will start soon!')

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
  server.listen(port);

  console.log("OpenDataMap-server is listening on port " + port);
}