"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roomSchema = new mongoose_1.default.Schema({
    price: {
        type: String,
        required: true,
    },
    bookedByUser: {
        type: String,
    },
    totalSeates: {
        type: Number,
        required: true,
    },
    seatsRemaining: {
        type: Number,
    },
    isBooked: { type: Boolean },
});
exports.default = mongoose_1.default.model("Room", roomSchema);
