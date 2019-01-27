/// <reference path="server.d.ts" />

import * as cors from 'cors';
import * as express from 'express'
import * as path from 'path';
const {ApolloServer} = require('apollo-server-express');
import schema from './schema'
import * as socketIO from 'socket.io'
import {downloadDataSource, socketUpdateDataSource, updateDataSourcesPerodically} from "./socketUpdateDataSource";
import * as fs from "fs";
const config = JSON.parse(fs.readFileSync("src/config.json").toString());
export function start(port) {
    for (let moduleI in config.modules) {
        if (config.modules.hasOwnProperty(moduleI)) {
            downloadDataSource(config.modules[moduleI]).catch((err) => {
                // ERROR
            });

        }
    }
    let expressServer = express();
    const httpServer = require('http').Server(expressServer);
    const io = socketIO(httpServer);
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
    expressServer.get('/assets/fonts/*', function (req, res) {
        res.sendFile(path.join(__dirname + '/../dist/fonts/' + req.params[0]));
    });
    expressServer.get('/assets/images/*', function (req, res) {
        res.sendFile(path.join(__dirname + '/../dist/images/' + req.params[0]));
    });

    const apolloServer = new ApolloServer({schema});

    apolloServer.applyMiddleware({app: expressServer, path: "/api"});

    httpServer.listen(port, '0.0.0.0');

    updateDataSourcesPerodically();
    io.on('connection', function (socket) {
        socketUpdateDataSource(socket);
    });
    console.log("OpenDataMap-expressServer is listening on port " + port);
}