import { Router } from "express";
import { getAllItemsController, createItemController, updateItemController, deleteItemController, getItemByIdController } from "../controllers/item.controller";

const router = Router();

// GET route to fetch all items
router.get('/', getAllItemsController);

// GET route to fetch an item by ID
router.get('/:id', getItemByIdController); // New route

// POST route to create a new item
router.post('/', createItemController);

// PUT route to update an item
router.put('/:id', updateItemController);

// DELETE route to delete an item
router.delete('/:id', deleteItemController);

export default router;
