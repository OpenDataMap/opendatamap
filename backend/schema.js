"use strict";
/// <reference path="schema.d.ts" />
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
// @ts-ignore
var graphql_tools_1 = require("graphql-tools");
var gql = require('apollo-server-express').gql;
var resolvers_1 = require("./resolvers");
var typeDefs = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Query {\n        getDataSource(dataSourceName: String): String\n    }\n    schema {\n        query: Query,\n}"], ["\n    type Query {\n        getDataSource(dataSourceName: String): String\n    }\n    schema {\n        query: Query,\n}"])));
exports["default"] = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers_1.resolvers
});
var templateObject_1;
