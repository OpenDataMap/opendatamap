"use strict";
/// <reference path="server.d.ts" />
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var cors = require("cors");
var express = require("express");
var path = require("path");
var fs = require("fs");
var axios = require('axios');
var _a = require('apollo-server-express'), ApolloServer = _a.ApolloServer, gql = _a.gql;
var config = JSON.parse(fs.readFileSync("src/config.json").toString());
function start(port) {
    var downloadDataSource = function (dataSourceName) {
        return new Promise(function (resolve, reject) {
            var _loop_1 = function (moduleI) {
                if (config.modules.hasOwnProperty(moduleI)) {
                    var module_1 = config.modules[moduleI];
                    if (module_1.config.layerName === dataSourceName) {
                        var err = false;
                        console.log(dataSourceName);
                        var dataURL_1 = module_1.config.dataURL;
                        axios.get(dataURL_1).then(function (response) {
                            console.log(response.data);
                            resolve(response.data);
                        })["catch"](function (error) {
                            console.error('Error downloading ' + dataURL_1 + ' - StatusCode: ' + error.response.status);
                            reject(Error('Error downloading ' + dataURL_1 + ' - StatusCode: ' + error.response.status));
                        });
                        if (!err) {
                            return "break";
                        }
                    }
                }
            };
            for (var moduleI in config.modules) {
                var state_1 = _loop_1(moduleI);
                if (state_1 === "break")
                    break;
            }
        });
    };
    var expressServer = express();
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
    var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      # The \"Query\" type is the root of all GraphQL queries.\n      # (A \"Mutation\" type will be covered later on.)\n      type Query {\n        getDataSource(dataSourceName: String): String\n      }\n    "], ["\n      # The \"Query\" type is the root of all GraphQL queries.\n      # (A \"Mutation\" type will be covered later on.)\n      type Query {\n        getDataSource(dataSourceName: String): String\n      }\n    "])));
    // Provide resolver functions for your schema fields
    var resolvers = {
        Query: {
            getDataSource: function (_, _a) {
                var dataSourceName = _a.dataSourceName;
                return downloadDataSource(dataSourceName).then(function (response) {
                    // console.log(response);
                    // console.log(typeof(response))
                    return JSON.stringify(response);
                });
            }
        }
    };
    var apolloServer = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
    apolloServer.applyMiddleware({ app: expressServer, path: "/api" });
    expressServer.listen(port, '0.0.0.0');
    console.log("OpenDataMap-expressServer is listening on port " + port);
}
exports.start = start;
var templateObject_1;
