"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemController = exports.updateItemController = exports.createItemController = exports.getItemByIdController = exports.getAllItemsController = void 0;
const item_service_1 = require("../services/item.service");
// Controller for GET all items
const getAllItemsController = async (req, res, next) => {
    try {
        const items = await (0, item_service_1.getAllItems)();
        res.status(200).json(items);
    }
    catch (err) {
        next(err);
    }
};
exports.getAllItemsController = getAllItemsController;
// Controller for GET an item by ID
const getItemByIdController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const item = await (0, item_service_1.getItemById)(Number(id));
        if (!item) {
            res.status(404).json({ message: `Item with ID ${id} not found` });
            return;
        }
        res.status(200).json(item);
    }
    catch (err) {
        next(err);
    }
};
exports.getItemByIdController = getItemByIdController;
// Controller for POST create a new item
const createItemController = async (req, res, next) => {
    const { name, price, description } = req.body;
    // Simple validation (can be enhanced)
    if (!name || !price) {
        res.status(400).json({ message: "Name and price are required" });
        return; // We don't need to return anything else after sending a response
    }
    try {
        // Call service to create a new item
        const result = await (0, item_service_1.createItem)(name, price, description);
        // Return the created item (or just a success message)
        res.status(201).json({ message: "Item created successfully", item: result });
    }
    catch (err) {
        next(err);
    }
};
exports.createItemController = createItemController;
// Controller for PUT update an item
const updateItemController = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    if (!name && !price && !description) {
        res.status(400).json({ message: "At least one field (name, price, description) must be provided to update" });
        return;
    }
    try {
        const result = await (0, item_service_1.updateItem)(Number(id), name, price, description);
        res.status(200).json({ message: "Item updated successfully", item: result });
    }
    catch (err) {
        next(err);
    }
};
exports.updateItemController = updateItemController;
// Controller for DELETE delete an item
const deleteItemController = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await (0, item_service_1.deleteItem)(Number(id));
        res.status(200).json({ message: `Item with ID ${id} deleted successfully` });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteItemController = deleteItemController;
