"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messBill = exports.hostelDetailType = exports.mealType = exports.complainType = exports.roomType = exports.userType = void 0;
const graphql_1 = require("graphql");
exports.userType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
        confirmPassword: { type: graphql_1.GraphQLString },
        roomId: { type: graphql_1.GraphQLID },
        isActive: { type: graphql_1.GraphQLBoolean },
        isAuthenticated: { type: graphql_1.GraphQLBoolean },
        totalBill: { type: graphql_1.GraphQLInt },
        billPaid: { type: graphql_1.GraphQLBoolean },
        accountType: { type: graphql_1.GraphQLString },
    }),
});
exports.roomType = new graphql_1.GraphQLObjectType({
    name: "Room",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        totalSeates: { type: graphql_1.GraphQLInt },
        seatsRemaining: { type: graphql_1.GraphQLInt },
        price: { type: graphql_1.GraphQLString },
        bookedByUser: { type: graphql_1.GraphQLID },
        isBooked: { type: graphql_1.GraphQLBoolean },
    }),
});
exports.complainType = new graphql_1.GraphQLObjectType({
    name: "Complain",
    fields: () => ({
        userId: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
        complainMessage: { type: graphql_1.GraphQLString },
    }),
});
exports.mealType = new graphql_1.GraphQLObjectType({
    name: "Meal",
    fields: () => ({
        mealName: { type: graphql_1.GraphQLString },
        units: { type: graphql_1.GraphQLInt },
    }),
});
exports.hostelDetailType = new graphql_1.GraphQLObjectType({
    name: "HostelDetail",
    fields: () => ({
        hostelTimming: { type: graphql_1.GraphQLString },
        emergencyContactNumber: { type: graphql_1.GraphQLInt },
    }),
});
exports.messBill = new graphql_1.GraphQLObjectType({
    name: "MessBill",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        userId: { type: graphql_1.GraphQLID },
        totalbill: { type: graphql_1.GraphQLInt },
    }),
});
