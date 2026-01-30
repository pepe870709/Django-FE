import z from 'zod';

export const signInUserValidationSchema = z.object({
  type: z.literal('signin'),
  email: z.string().email('Invalid email address'),
  remember: z.boolean().optional(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters long')
    .max(20, 'Password must not exceed 20 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});

export const signUpUserValidationSchema = signInUserValidationSchema.extend({
  type: z.literal('signup'),
  name: z.string().min(2, 'Name must be at least 2 characters long').max(50, 'Name must not exceed 50 characters'),
});

export type SignInUserValidationSchema = z.infer<typeof signInUserValidationSchema>;
export type SignUpUserValidationSchema = z.infer<typeof signUpUserValidationSchema>;

export const validateUser = (data: SignInUserValidationSchema | SignUpUserValidationSchema) => {
    if (data.type === "signin"){
        return signInUserValidationSchema.safeParse(data);
    }
  return signUpUserValidationSchema.safeParse(data);
};

// export const validateUserAsync = async (data: UserValidationSchema) => {
//   return await userValidationSchema.parseAsync(data);
// };

// export const userValidationErrorMessages = {
//   email: {
//     required: 'Email is required',
//     invalid: 'Invalid email address',
//   },
//   password: {
//     required: 'Password is required',
//     minLength: 'Password must be at least 6 characters long',
//     maxLength: 'Password must not exceed 20 characters',
//     pattern: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
//   },
// };

// export const userValidationErrorMessagesAsync = async (data: UserValidationSchema) => {
//   try {
//     await validateUserAsync(data);
//     return null; // No errors
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return error.errors.reduce((acc, curr) => {
//         acc[curr.path[0]] = userValidationErrorMessages[curr.path[0]][curr.code];
//         return acc;
//       }, {});
//     }
//     throw error; // Re-throw unexpected errors
//   }
// };