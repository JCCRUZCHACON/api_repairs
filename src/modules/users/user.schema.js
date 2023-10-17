import z from 'zod';
//import { extractValidationData } from '../common/utils/extractErrorData.js';

const registerSchema = z.object({
  name: z.string()
            .min(3, { message: 'Name is too short' })
            .max(199, { message: 'Name is too long' }),
  email: z.string().email({ message: 'Invalid email'}),
  password: z.string().min(8, { message: 'Password is too short' }),
  role: z.enum(['client', 'employee']),
  status: z.enum(['available', 'disabled'])
})

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email'}),
  password: z.string().min(8, { message: 'Password is too short' }),
})

// export const validateRegister = data => {
//   const result = registerSchema.safeParse(data);

//   const {
//     hasError,
//     errorMessages,
//     data: userData
//   } = extractValidationData(result);

//   return {
//     hasError,
//     errorMessages,
//     userData
//   }
// }

// export const validateLogin = data => {
//   const result = loginUserSchema.safeParse(data)

//   const {
//     hasError,
//     errorMessages,
//     data: userData,
//   } = extractValidationData(result)

//   return {
//     hasError,
//     errorMessages,
//     userData
//   }
// }