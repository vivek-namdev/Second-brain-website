"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
mongoose_1.default.connect("mongodb+srv://viveknamdev018:ta8bbPHweOvcYKsC@cluster0.cogp1.mongodb.net/brainly");
const UserSchema = new mongoose_2.Schema({
    username: { type: String, unique: true },
    password: String
});
exports.UserModel = (0, mongoose_2.model)("User", UserSchema);
const ContentSchema = new mongoose_2.Schema({
    title: String,
    link: String,
    type: String,
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true }
});
exports.ContentModel = (0, mongoose_2.model)("Content", ContentSchema);
const LinkSchema = new mongoose_2.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true, unique: true }
});
exports.LinkModel = (0, mongoose_2.model)("Links", LinkSchema);
