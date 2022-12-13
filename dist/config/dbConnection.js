"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbconnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dbconnection = () => {
    let secret = process.env.MONGO_URI;
    mongoose_1.default.connect(secret).then(() => {
        console.log("connected to the database successfully");
    }).catch((e) => {
        console.log("connection to the database failed");
    });
};
exports.dbconnection = dbconnection;
