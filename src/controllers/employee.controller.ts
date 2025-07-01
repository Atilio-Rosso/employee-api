import { FastifyRequest, FastifyReply } from 'fastify'
import {
    CreateEmployeeInput,
    UpdateEmployeeInput,
    EmployeeIdParam,
} from '../schemas/employee.schema'

export const getEmployees = async (req: FastifyRequest, reply: FastifyReply) => {
    const employees = await req.server.prisma.employee.findMany()
    return reply.send(employees)
}

export const getEmployeeById = async (
    req: FastifyRequest<{ Params: EmployeeIdParam }>,
    reply: FastifyReply
) => {
    const id = parseInt(req.params.id, 10)

    const employee = await req.server.prisma.employee.findUnique({
        where: { id },
    })

    if (!employee) {
        return reply.code(404).send({ message: 'Empleado no encontrado' })
    }

    return reply.send(employee)
}

export const createEmployee = async (
    req: FastifyRequest<{ Body: CreateEmployeeInput }>,
    reply: FastifyReply
) => {
    const employee = await req.server.prisma.employee.create({
        data: req.body,
    })
    return reply.code(201).send(employee)
}

export const updateEmployee = async (
    req: FastifyRequest<{ Params: EmployeeIdParam; Body: UpdateEmployeeInput }>,
    reply: FastifyReply
) => {
    const id = parseInt(req.params.id, 10)

    const updated = await req.server.prisma.employee.update({
        where: { id },
        data: req.body,
    })

    return reply.send(updated)
}

export const deleteEmployee = async (
    req: FastifyRequest<{ Params: EmployeeIdParam }>,
    reply: FastifyReply
) => {
    const id = parseInt(req.params.id, 10)

    await req.server.prisma.employee.delete({
        where: { id },
    })

    return reply.code(204).send()
}