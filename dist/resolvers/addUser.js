"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const user_1 = __importDefault(require("../models/user"));
function addUser(parent, args) {
    try {
        const newUser = yield new user_1.default({ name: args.name, email: args.email, password: args.password, confirmPassword: args.confirmPassword, roomId: args.roomId }).save();
        return newUser;
    }
    catch (error) {
        console.log(error.message);
        return error.message;
    }
}
exports.addUser = addUser;
