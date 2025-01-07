"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const item_controller_1 = require("../controllers/item.controller");
const item_validator_1 = require("../validators/item.validator"); // Import validation functions
const router = (0, express_1.Router)();
// GET route to fetch all items
router.get('/', item_controller_1.getAllItemsController);
// GET route to fetch an item by ID
router.get('/:id', item_controller_1.getItemByIdController); // New route
// POST route to create a new item
router.post('/', item_validator_1.validateCreateItem, item_controller_1.createItemController);
// PUT route to update an item
router.put('/:id', item_validator_1.validateUpdateItem, item_controller_1.updateItemController);
// DELETE route to delete an item
router.delete('/:id', item_controller_1.deleteItemController);
exports.default = router;
