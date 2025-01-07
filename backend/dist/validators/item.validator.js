"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateItem = exports.validateCreateItem = void 0;
const express_validator_1 = require("express-validator");
// Validation for POST (Create Item) request
exports.validateCreateItem = [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Name is required') // Ensure 'name' is not empty
        .isString()
        .withMessage('Name must be a string'), // Ensure 'name' is a string
    (0, express_validator_1.body)('price')
        .notEmpty()
        .withMessage('Price is required') // Ensure 'price' is provided
        .isNumeric()
        .withMessage('Price must be a numeric value'), // Ensure 'price' is a number
    (0, express_validator_1.body)('description')
        .optional()
        .isString()
        .withMessage('Description must be a string if provided') // Ensure 'description' is a string if provided
];
// Validation for PUT (Update Item) request
exports.validateUpdateItem = [
    (0, express_validator_1.body)('name')
        .optional()
        .isString()
        .withMessage('Name must be a string'), // 'name' is optional, but if provided, it must be a string
    (0, express_validator_1.body)('price')
        .optional()
        .isNumeric()
        .withMessage('Price must be a numeric value'), // 'price' is optional, but if provided, it must be a number
    (0, express_validator_1.body)('description')
        .optional()
        .isString()
        .withMessage('Description must be a string if provided') // 'description' is optional, but if provided, it must be a string
];
