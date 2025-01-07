import { body, validationResult } from 'express-validator'; // Use named imports

// Validation for POST (Create Item) request
export const validateCreateItem = [
  body('name')
    .notEmpty()
    .withMessage('Name is required') // Ensure 'name' is not empty
    .isString()
    .withMessage('Name must be a string'), // Ensure 'name' is a string
  
  body('price')
    .notEmpty()
    .withMessage('Price is required') // Ensure 'price' is provided
    .isNumeric()
    .withMessage('Price must be a numeric value'), // Ensure 'price' is a number
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string if provided') // Ensure 'description' is a string if provided
];

// Validation for PUT (Update Item) request
export const validateUpdateItem = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string'), // 'name' is optional, but if provided, it must be a string
  
  body('price')
    .optional()
    .isNumeric()
    .withMessage('Price must be a numeric value'), // 'price' is optional, but if provided, it must be a number
  
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string if provided') // 'description' is optional, but if provided, it must be a string
];

// Middleware to handle validation results
export const handleValidationErrors = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
