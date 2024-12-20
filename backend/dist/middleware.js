"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userMiddleware = (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        if (!header || !header.startsWith("Bearer ")) {
            res.status(401).json({ message: "Authorization token missing or malformed" });
            return;
        }
        const token = header.split(" ")[1]; // Extract the token part
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        if (decoded) {
            // Attach user ID to the request object
            req.userId = decoded.id; // Ensure compatibility
            next();
        }
        else {
            res.status(403).json({ message: "You are not logged in" });
        }
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid token",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};
exports.userMiddleware = userMiddleware;
