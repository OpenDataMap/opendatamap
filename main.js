const fs = require('fs');
const axios = require('axios');
const commander = require('commander');
const child_process = require('child_process');
const sass = require('node-sass');
const watch = require('recursive-watch');
const cryptojs = require('crypto-js');
commander
    .version('0.4.6')
    .description('Server for OpenDataMap');

// development server
commander
    .command('development [port]')
    .alias('dev')
    .description('server for development use')
    .action(function (portInput) {
        // build the assets
        console.log('Please wait! The assets were built');
        buildAssets();

        // start server
        const server = require('./backend/server');
        server.start(portInput || process.env.PORT || 4000);

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
    });

// test server
commander
    .command('test')
    .description('test')
    .action(function () {
        buildAssets();
        console.log('Passed');
    })

// server for production use
commander
    .command('production [port]')
    .alias('prod')
    .description('server for production use')
    .action(function (portInput) {
        // build the assets
        console.log('Please wait! The assets were built');
        buildAssets();

        const server = require('./backend/server');
        // start server
        server.start(portInput || process.env.PORT || 4000);
    });
// show help if no command was entered
commander.parse(process.argv)
if (commander.args.length === 0) {
    commander.help();
}

function buildAssets() {
    buildWebpack();
    buildSass();
    if (!fs.existsSync('dist/data')) {
        fs.mkdirSync('dist/data')
    }
    if (!fs.existsSync('backend/dataSources')) {
        fs.mkdirSync('backend/dataSources')
    }
    console.log('The assets finished building!');
}

function buildWebpack() {
    //typescript server
    const backendBuild = child_process.spawnSync('node_modules/typescript/bin/tsc', ['backend/server.ts', '--lib', 'es2015,dom,esnext.asynciterable', '-m', 'commonjs']);
    if (backendBuild.stderr.toString()) throw backendBuild.stderr.toString();
    if (backendBuild.stdout.toString().includes('Error') || backendBuild.stdout.toString().includes('ERROR')) throw backendBuild.stdout.toString();

    // webpack-build
    const webpackBuild = child_process.spawnSync('node_modules/webpack/bin/webpack.js');
    if (webpackBuild.stderr.toString()) throw webpackBuild.stderr.toString();
    if (webpackBuild.stdout.toString().includes('Error') || webpackBuild.stdout.toString().includes('ERROR')) throw webpackBuild.stdout.toString();
}

function buildSass() {
    // sass build
    if (!fs.existsSync('dist/css')) {
        fs.mkdirSync('dist/css')
    }
    sass.render({
        file: 'src/scss/light/main.scss',
        outputStyle: "compressed"
    }, function (err, result) {
        if (err) throw err;
        fs.writeFile('dist/css/light.css', result.css, (error) => {
            if (error) throw error;
        });
    });
    sass.render({
        file: 'src/scss/night/main.scss',
        outputStyle: "compressed"
    }, function (err, result) {
        if (err) throw err;
        fs.writeFile("dist/css/night.css", result.css, (error) => {
            if (error) throw error;
        });
    })
}
