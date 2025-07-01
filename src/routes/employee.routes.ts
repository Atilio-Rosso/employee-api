import { FastifyInstance } from 'fastify'
import {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from '../controllers/employee.controller'
import {
    createEmployeeSchema,
    updateEmployeeSchema,
    employeeSchema,
    employeeIdParamSchema,
} from '../schemas/employee.schema'
import { zodToSchema } from '../utils/zodToSchema'

export default async function employeeRoutes(fastify: FastifyInstance) {
    fastify.get('/employees', {
        schema: {
            response: {
                200: {
                    type: 'array',
                    items: zodToSchema(employeeSchema),
                },
            },
        },
        handler: getEmployees,
    })

    fastify.get('/employees/:id', {
        schema: {
            params: zodToSchema(employeeIdParamSchema),
            response: {
                200: zodToSchema(employeeSchema),
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
            },
        },
        handler: getEmployeeById,
    })

    fastify.post('/employees', {
        schema: {
            body: zodToSchema(createEmployeeSchema),
            response: {
                201: zodToSchema(employeeSchema),
            },
        },
        handler: createEmployee,
    })

    fastify.put('/employees/:id', {
        schema: {
            params: zodToSchema(employeeIdParamSchema),
            body: zodToSchema(updateEmployeeSchema),
            response: {
                200: zodToSchema(employeeSchema),
            },
        },
        handler: updateEmployee,
    })

    fastify.delete('/employees/:id', {
        schema: {
            params: zodToSchema(employeeIdParamSchema),
            response: {
                204: {
                    description: 'Empleado eliminado',
                    type: 'null',
                },
            },
        },
        handler: deleteEmployee,
    })
}
