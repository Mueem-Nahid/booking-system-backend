import { z } from 'zod';
import { userRole } from '../auth/auth.constants';

const signupUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    contactNo: z.string({
      required_error: 'Contact number is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    profileImg: z.string({
      required_error: 'Address is required',
    }),
    role: z
      .string()
      .optional()
      .refine(
        value => {
          return value === undefined; // Ensure that 'role' is not present
        },
        {
          message: 'You cannot set role.',
        }
      ),
  }),
});

const updateUserZodSchema = z.object({
  body: z
    .object({
      password: z.string().optional(),
      name: z.string().optional(),
      contactNo: z.string().optional(),
      address: z.string().optional(),
      profileImg: z.string().optional(),
      role: z.enum([...userRole] as [string, ...string[]]).optional(),
    })
    .strict(),
});

export const UserValidation = {
  signupUserZodSchema,
  updateUserZodSchema,
};
