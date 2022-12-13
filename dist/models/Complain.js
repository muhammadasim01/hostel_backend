"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const complainSchema = new mongoose_1.default.Schema({
    userId: { type: String, requied: true },
    userName: { type: String, requied: true },
    complainMessage: { type: String, requied: true },
});
exports.default = mongoose_1.default.model("Complain", complainSchema);
