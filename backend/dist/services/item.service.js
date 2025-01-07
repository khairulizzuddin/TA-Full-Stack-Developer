"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItemById = exports.createItem = exports.getAllItems = void 0;
const tslib_1 = require("tslib");
const db_1 = tslib_1.__importDefault(require("../db"));
const getAllItems = async () => {
    try {
        const query = 'SELECT * FROM items';
        const [rows] = await db_1.default.query(query);
        return rows;
    }
    catch (err) {
        console.error('Error fetching all items:', err);
        throw new Error('Could not fetch items');
    }
};
exports.getAllItems = getAllItems;
const createItem = async (name, price, description) => {
    try {
        const query = 'INSERT INTO items (name, price, description) VALUES (?, ?, ?)';
        const [result] = await db_1.default.query(query, [name, price, description]);
        return result;
    }
    catch (err) {
        console.error('Error creating item:', err);
        throw new Error('Could not create item');
    }
};
exports.createItem = createItem;
const getItemById = async (id) => {
    try {
        const query = 'SELECT * FROM items WHERE id = ?';
        const [rows] = await db_1.default.query(query, [id]);
        return rows[0] || null; // Return the first item or null if not found
    }
    catch (err) {
        console.error(`Error fetching item with id ${id}:`, err);
        throw new Error(`Could not fetch item with id ${id}`);
    }
};
exports.getItemById = getItemById;
const updateItem = async (id, name, price, description) => {
    try {
        const query = `
      UPDATE items
      SET name = COALESCE(?, name),
          price = COALESCE(?, price),
          description = COALESCE(?, description)
      WHERE id = ?`;
        const [result] = await db_1.default.query(query, [name, price, description, id]);
        return result;
    }
    catch (err) {
        console.error(`Error updating item with id ${id}:`, err);
        throw new Error(`Could not update item with id ${id}`);
    }
};
exports.updateItem = updateItem;
const deleteItem = async (id) => {
    try {
        const query = 'DELETE FROM items WHERE id = ?';
        const [result] = await db_1.default.query(query, [id]);
        return result;
    }
    catch (err) {
        console.error(`Error deleting item with id ${id}:`, err);
        throw new Error(`Could not delete item with id ${id}`);
    }
};
exports.deleteItem = deleteItem;