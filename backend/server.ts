/// <reference path="server.d.ts" />

import * as cors from 'cors';
import * as express from 'express'
import * as path from 'path';
import * as fs from 'fs';
import * as cryptojs from 'crypto-js';
const axios = require('axios');
const {ApolloServer, gql} = require('apollo-server-express');
const config = JSON.parse(fs.readFileSync("src/config.json").toString());

export function start(port) {
    const downloadDataSource = (dataSourceName) => {
        return new Promise((resolve, reject) => {
            for (let moduleI in config.modules) {
                if(config.modules.hasOwnProperty(moduleI)) {
                    const module = config.modules[moduleI];
                    if (module.config.layerName === dataSourceName) {
                        let err = false;
                        console.log(dataSourceName)
                        const dataURL = module.config.dataURL;
                        axios.get(dataURL).then(function (response) {
                            console.log(response.data)
                            resolve(response.data)
                        }).catch(function (error) {
                            console.error('Error downloading ' + dataURL + ' - StatusCode: ' + error.response.status);
                            reject(Error('Error downloading ' + dataURL + ' - StatusCode: ' + error.response.status))
                        });
                        if(!err) {
                            break;
                        }
                    }
                }
            }
        });
    }
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

    // Construct a schema, using GraphQL schema language
    const typeDefs = gql`
      # The "Query" type is the root of all GraphQL queries.
      # (A "Mutation" type will be covered later on.)
      type Query {
        getDataSource(dataSourceName: String): String
      }
    `;

// Provide resolver functions for your schema fields
    const resolvers = {
        Query: {
            getDataSource: (_, {dataSourceName}) => {
                return downloadDataSource(dataSourceName).then((response) => {
                    return JSON.stringify(response);
                });
            }
        },
    };


    const apolloServer = new ApolloServer({typeDefs, resolvers});

    apolloServer.applyMiddleware({app: expressServer, path: "/api"});

    expressServer.listen(port, '0.0.0.0');

    console.log("OpenDataMap-expressServer is listening on port " + port);
}