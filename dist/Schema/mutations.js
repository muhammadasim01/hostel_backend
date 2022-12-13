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
exports.rootMutation = void 0;
const graphql_1 = require("graphql");
const graphqltypes_1 = require("./graphqltypes");
const user_1 = __importDefault(require("../models/user"));
const Room_1 = __importDefault(require("../models/Room"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Complain_1 = __importDefault(require("../models/Complain"));
const Meal_1 = __importDefault(require("../models/Meal"));
const HostelDetails_1 = __importDefault(require("../models/HostelDetails"));
exports.rootMutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: graphqltypes_1.userType,
            args: {
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                confirmPassword: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                roomId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                accountType: {
                    type: new graphql_1.GraphQLEnumType({
                        name: "accountType",
                        values: {
                            STUDENT: { value: "STUDENT" },
                            WORKER: { value: "WORKER" },
                            ADMIN: { value: "ADMIN" },
                        },
                    }),
                },
                token: { type: graphql_1.GraphQLString },
                isActive: { type: graphql_1.GraphQLBoolean },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const existUser = yield user_1.default.findOne({ email: args.email });
                        if (existUser)
                            return "user already exists";
                        if (args.password !== args.confirmPassword)
                            return { message: "password do not match" };
                        const newUser = yield new user_1.default({
                            name: args.name,
                            email: args.email,
                            password: args.password,
                            confirmPassword: args.confirmPassword,
                            roomId: args.roomId,
                            isActive: args.isActive,
                            accountType: args.accountType,
                        }).save();
                        return newUser;
                    }
                    catch (error) {
                        console.log(error.message);
                        return error.message;
                    }
                });
            },
        },
        loginUser: {
            type: graphqltypes_1.userType,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const existUser = yield user_1.default.findOne({ email: args.email });
                        if (existUser) {
                            const isMatch = yield bcryptjs_1.default.compare(args.password, existUser.password);
                            if (isMatch) {
                                const token = yield existUser.generateToken();
                                if (token) {
                                    const logedinuser = yield user_1.default.findOneAndUpdate({ email: args.email }, { isAuthenticated: true }, { new: true });
                                    return logedinuser;
                                }
                            }
                            else {
                                return { success: false, message: "invalid credentials" };
                            }
                        }
                        else {
                            return { success: false, message: "invalid credentials" };
                        }
                    }
                    catch (error) {
                        console.log(error.message);
                        return error.message;
                    }
                });
            },
        },
        updateUser: {
            type: graphqltypes_1.userType,
            args: {
                id: { type: graphql_1.GraphQLID },
                name: { type: graphql_1.GraphQLString },
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString },
                confirmPassword: { type: graphql_1.GraphQLString },
                roomId: { type: graphql_1.GraphQLID },
                isActive: { type: graphql_1.GraphQLBoolean },
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newUser = yield user_1.default.findByIdAndUpdate(args.id, {
                            name: args.name,
                            email: args.email,
                            password: args.password,
                            confirmPassword: args.confirmPassword,
                            roomId: args.roomId,
                            isActive: args.isActive,
                        }, { new: true });
                        return newUser;
                    }
                    catch (error) {
                        console.log(error.message);
                        return error.message;
                    }
                });
            },
        },
        addRoom: {
            type: graphqltypes_1.roomType,
            args: {
                totalSeates: { type: graphql_1.GraphQLInt },
                seatsRemaining: { type: graphql_1.GraphQLInt },
                price: { type: graphql_1.GraphQLInt },
                bookedByUser: { type: graphql_1.GraphQLID },
                isBooked: { type: graphql_1.GraphQLBoolean },
            },
            resolve(parent, { totalSeates, seatsRemaining, price, bookedByUser, isBooked }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newRoom = yield new Room_1.default({
                            totalSeates,
                            seatsRemaining,
                            price,
                            bookedByUser,
                            isBooked,
                        }).save();
                        return newRoom;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        updateRoom: {
            type: graphqltypes_1.roomType,
            args: {
                id: { type: graphql_1.GraphQLID },
                totalSeates: { type: graphql_1.GraphQLInt },
                seatsRemaining: { type: graphql_1.GraphQLInt },
                price: { type: graphql_1.GraphQLInt },
                bookedByUser: { type: graphql_1.GraphQLID },
                isBooked: { type: graphql_1.GraphQLBoolean },
            },
            resolve(parent, { totalSeates, seatsRemaining, price, bookedByUser, isBooked, id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newRoom = yield Room_1.default.findByIdAndUpdate(id, { totalSeates, seatsRemaining, price, bookedByUser, isBooked }, { new: true });
                        return newRoom;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        bookRoom: {
            type: graphqltypes_1.roomType,
            args: {
                id: { type: graphql_1.GraphQLID },
                bookedByUser: { type: graphql_1.GraphQLID },
            },
            resolve(parent, { bookedByUser, id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const bookedRoom = yield Room_1.default.findByIdAndUpdate(id, { bookedByUser, isBooked: true }, { new: true });
                        return bookedRoom;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        makeComplain: {
            type: graphqltypes_1.complainType,
            args: {
                userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                complainMessage: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
            },
            resolve(parent, { userId, complainMessage }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const user = yield user_1.default.findOne({ _id: userId });
                        if (user) {
                            const newComplain = yield new Complain_1.default({
                                userId: user._id,
                                userName: user.name,
                                complainMessage,
                            }).save();
                            if (newComplain)
                                return newComplain;
                        }
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        addMeal: {
            type: graphqltypes_1.mealType,
            args: {
                mealName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                units: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve(parent, { mealName, units }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newMeal = yield new Meal_1.default({ mealName, units }).save();
                        if (newMeal)
                            return newMeal;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
        addHostelDeatails: {
            type: graphqltypes_1.hostelDetailType,
            args: {
                hostelTimming: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                emergencyContactNumber: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLInt) },
            },
            resolve(parent, { hostelTimming, emergencyContactNumber }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const newHostelDetails = yield new HostelDetails_1.default({
                            hostelTimming,
                            emergencyContactNumber,
                        }).save();
                        if (newHostelDetails)
                            return newHostelDetails;
                    }
                    catch (error) {
                        return error;
                    }
                });
            },
        },
    },
});
