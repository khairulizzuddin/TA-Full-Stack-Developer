import pool from '../db';
import { RowDataPacket } from 'mysql2';


interface Item {
  id: number;
  name: string;
  price: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllItems = async () => {
  try {
    const query = 'SELECT * FROM items';
    const [rows] = await pool.query(query);
    return rows;
  } catch (err) {
    console.error('Error fetching all items:', err);
    throw new Error('Could not fetch items');
  }
};

export const createItem = async (name: string, price: number, description?: string) => {
  try {
    const query = 'INSERT INTO items (name, price, description) VALUES (?, ?, ?)';
    const [result] = await pool.query(query, [name, price, description]);
    return result;
  } catch (err) {
    console.error('Error creating item:', err);
    throw new Error('Could not create item');
  }
};

export const getItemById = async (id: number): Promise<Item | null> => {
  try {
    const query = 'SELECT * FROM items WHERE id = ?';
    const [rows] = await pool.query<(Item & RowDataPacket)[]>(query, [id]);
    return rows[0] || null; // Return the first item or null if not found
  } catch (err) {
    console.error(`Error fetching item with id ${id}:`, err);
    throw new Error(`Could not fetch item with id ${id}`);
  }
};

export const updateItem = async (id: number, name?: string, price?: number, description?: string) => {
  try {
    const query = `
      UPDATE items
      SET name = COALESCE(?, name),
          price = COALESCE(?, price),
          description = COALESCE(?, description)
      WHERE id = ?`;
    const [result] = await pool.query(query, [name, price, description, id]);
    return result;
  } catch (err) {
    console.error(`Error updating item with id ${id}:`, err);
    throw new Error(`Could not update item with id ${id}`);
  }
};

export const deleteItem = async (id: number) => {
  try {
    const query = 'DELETE FROM items WHERE id = ?';
    const [result] = await pool.query(query, [id]);
    return result;
  } catch (err) {
    console.error(`Error deleting item with id ${id}:`, err);
    throw new Error(`Could not delete item with id ${id}`);
  }
};
