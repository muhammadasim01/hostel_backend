"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const queries_1 = require("./queries");
const mutations_1 = require("./mutations");
exports.default = new graphql_1.GraphQLSchema({
    query: queries_1.rootQuery,
    mutation: mutations_1.rootMutation
});
