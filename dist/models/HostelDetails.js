"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const hostelDetailSchema = new mongoose_1.default.Schema({
    hostelTimming: { type: String },
    emergencyContactNumber: { type: Number },
});
exports.default = mongoose_1.default.model("HostelDetail", hostelDetailSchema);
