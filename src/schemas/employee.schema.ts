
import { z } from 'zod'

export const createEmployeeSchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.string().email('Email inválido'),
    position: z.string().min(1, 'El puesto es obligatorio'),
})

export const updateEmployeeSchema = createEmployeeSchema.partial()

export const employeeSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    position: z.string(),
    createdAt: z.string(),
})

export const employeeIdParamSchema = z.object({
    id: z.string().regex(/^\d+$/, 'ID inválido'),
})

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>
export type EmployeeOutput = z.infer<typeof employeeSchema>
export type EmployeeIdParam = z.infer<typeof employeeIdParamSchema>