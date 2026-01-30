import { title } from 'process';
import z, { string } from 'zod';

export const attributesSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long').max(30, 'Title must not exceed 30 characters').optional(),
  value: z.string().min(1, 'Value is required').max(10000, 'Value must not exceed 10000 characters').optional(),
});

export const optionsSchema = z.object({
  title: z.string().min(2, 'Option title must be at least 2 characters long').max(50, 'Option title must not exceed 50 characters').optional(),
  value: z.string().min(1, 'Option value must be at least 1 character long').max(20, 'Option value must not exceed 20 characters').optional(),
});

export const productValidationSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters long').max(100, 'Title must not exceed 100 characters'),
  brand: z.string().min(2, 'Brand must be at least 2 characters long').max(50, 'Brand must not exceed 50 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters long').max(1000, 'Description must not exceed 1,000 characters'),
  dimensions: z.string()
  .trim()
  .regex(
    /^\d+(?:\.\d+)?-\d+(?:\.\d+)?-\d+(?:\.\d+)?$/,
    "Use H-W-D, e.g. 10-20-30 (decimals OK)"
  ),
  price: z.number().min(0, 'Price must be a positive number').max(10000, 'Price must not exceed 10,000'),
  status: z.enum(['Active', 'Draft', 'Archived'], 'Status must be one of: Active, Draft, Archived'),
  weight: z.number().min(0, 'Weight must be a positive number').max(1000, 'Weight must not exceed 1,000'),
  stockQuantity: z.number().min(0, 'Stock Quantity must be a positive number').max(10000, 'Stock Quantity must not exceed 10,000'),
  currency: z.string().min(1, 'Currency is required').max(10, 'Currency must not exceed 10 characters'),
  imageUrl: z.array(z.string()).optional(),
  attributes: z.array(attributesSchema).optional(),
  options: z.array(optionsSchema).optional(),
});

export type ProductValidationSchema = z.infer<typeof productValidationSchema>;
export type AttributesSchema = z.infer<typeof attributesSchema>;
export type OptionsSchema = z.infer<typeof optionsSchema>;

export const validateProduct = (data: ProductValidationSchema) => {
  return productValidationSchema.safeParse(data);
};

export const validateAttributes = (data: AttributesSchema) => {
  return attributesSchema.safeParse(data);
};

export const validateOptions = (data: OptionsSchema) => {
  return optionsSchema.safeParse(data);
};

// export const validateProductAsync = async (data: ProductValidationSchema) => {
//   return await productValidationSchema.parseAsync(data);
// };

// export const productValidationErrorMessages = {
//   name: {
//     required: 'Name is required',
//     minLength: 'Name must be at least 2 characters long',
//     maxLength: 'Name must not exceed 100 characters',
//   },
//   price: {
//     required: 'Price is required',
//     min: 'Price must be a positive number',
//     max: 'Price must not exceed 10,000',
//   },
//   description: {
//     required: 'Description is required',
//     minLength: 'Description must be at least 10 characters long',
//     maxLength: 'Description must not exceed 1,000 characters',
//   },
//   category: {
//     required: 'Category is required',
//     minLength: 'Category must be at least 2 characters long',
//     maxLength: 'Category must not exceed 50 characters   ',
//   },
//   imageUrl: {
//     invalid: 'Invalid URL format',
//   },
// };