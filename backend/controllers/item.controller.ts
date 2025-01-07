import { Request, Response, NextFunction } from 'express';
import { getAllItems, createItem, updateItem, deleteItem, getItemById } from "../services/item.service";

// Controller for GET all items
export const getAllItemsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

// Controller for GET an item by ID
export const getItemByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const item = await getItemById(Number(id));

    if (!item) {
      res.status(404).json({ message: `Item with ID ${id} not found` });
      return;
    }

    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

// Controller for POST create a new item
export const createItemController = async (
  req: Request, 
  res: Response, 
  next: NextFunction
): Promise<void> => {  // Return type is explicitly `Promise<void>`
  const { name, price, description } = req.body;

  // Simple validation (can be enhanced)
  if (!name || !price) {
    res.status(400).json({ message: "Name and price are required" });
    return; // We don't need to return anything else after sending a response
  }

  try {
    // Call service to create a new item
    const result = await createItem(name, price, description);

    // Return the created item (or just a success message)
    res.status(201).json({ message: "Item created successfully", item: result });
  } catch (err) {
    next(err);
  }
};

// Controller for PUT update an item
export const updateItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const { name, price, description } = req.body;

  if (!name && !price && !description) {
    res.status(400).json({ message: "At least one field (name, price, description) must be provided to update" });
    return;
  }

  try {
    const result = await updateItem(Number(id), name, price, description);
    res.status(200).json({ message: "Item updated successfully", item: result });
  } catch (err) {
    next(err);
  }
};

// Controller for DELETE delete an item
export const deleteItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await deleteItem(Number(id));
    res.status(200).json({ message: `Item with ID ${id} deleted successfully` });
  } catch (err) {
    next(err);
  }
};