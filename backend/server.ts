/// <reference path="server.d.ts" />

import * as cors from 'cors';
import * as express from 'express'
import * as path from 'path';
const {ApolloServer} = require('apollo-server-express');
import schema from './schema'
export function start(port) {
    let expressServer = express();
    expressServer.use(cors());

    expressServer.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../dist/index.html'));
    });
    expressServer.get('/assets/css/light/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../dist/css/light.css'));
    });
    expressServer.get('/assets/css/night/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../dist/css/night.css'));
    });
    expressServer.get('/assets/js/main', function (req, res) {
        res.sendFile(path.join(__dirname + '/../dist/bundle.js'));
    });
    expressServer.get('/assets/fonts/roboto/*', function (req, res) {
        res.sendFile(path.join(__dirname + '/../dist/fonts/roboto/' + req.params[0]));
    });
    expressServer.get('/assets/images/*', function (req, res) {
        res.sendFile(path.join(__dirname + '/../dist/images/' + req.params[0]));
    });
    expressServer.get('/assets/data/*', function (req, res) {
        res.sendFile(path.join(__dirname + '/../dist/data/' + req.params[0]));
    });


    const apolloServer = new ApolloServer({schema});

    apolloServer.applyMiddleware({app: expressServer, path: "/api"});

    expressServer.listen(port, '0.0.0.0');

    console.log("OpenDataMap-expressServer is listening on port " + port);
}