"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootQuery = void 0;
const graphql_1 = require("graphql");
const graphqltypes_1 = require("./graphqltypes");
const user_1 = __importDefault(require("../models/user"));
const Room_1 = __importDefault(require("../models/Room"));
const Complain_1 = __importDefault(require("../models/Complain"));
const Meal_1 = __importDefault(require("../models/Meal"));
const HostelDetails_1 = __importDefault(require("../models/HostelDetails"));
exports.rootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new graphql_1.GraphQLList(graphqltypes_1.userType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const allusers = yield user_1.default.find({});
                        console.log(allusers);
                        return allusers;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        user: {
            type: new graphql_1.GraphQLList(graphqltypes_1.userType),
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const allusers = yield user_1.default.findOne({ _id: args.id });
                        console.log(allusers);
                        return [allusers];
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        room: {
            type: new graphql_1.GraphQLList(graphqltypes_1.roomType),
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const allrooms = yield Room_1.default.findOne({ _id: args.id });
                        console.log(allrooms);
                        return [allrooms];
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        rooms: {
            type: new graphql_1.GraphQLList(graphqltypes_1.roomType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const allrooms = yield Room_1.default.find({});
                        console.log(allrooms);
                        return allrooms;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        complains: {
            type: new graphql_1.GraphQLList(graphqltypes_1.complainType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const allComplains = yield Complain_1.default.find({});
                        if (allComplains)
                            return allComplains;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        meals: {
            type: new graphql_1.GraphQLList(graphqltypes_1.mealType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const allMeals = yield Meal_1.default.find({});
                        if (allMeals)
                            return allMeals;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        hostelDeatails: {
            type: new graphql_1.GraphQLList(graphqltypes_1.hostelDetailType),
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const allDetails = yield HostelDetails_1.default.find({});
                        if (allDetails)
                            return allDetails;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
    },
});
