/// <reference path="schema.d.ts" />

// @ts-ignore
import {makeExecutableSchema} from 'graphql-tools';
const {gql} = require('apollo-server-express');
import {resolvers} from './resolvers';
const typeDefs = gql`
    type Query {
        getDataSource(dataSourceName: String): String
    }
    schema {
        query: Query,
}`
export default makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers,
});