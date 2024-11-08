import { PrismaEmployeeRepository } from '@/repositores/prisma/prisma-employees-repository'
import { CreateEmployeeUseCase } from '@/use-cases/create-employee-use-case'
import { EmployeeAlreadyExistsError } from '@/use-cases/errors/employee-already-exists-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createEmployeeBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    department: z.string(),
    salary: z.number().min(1),
    birthDate: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, {
      message: 'Invalid format date. ',
    }),
  })

  const { name, email, department, birthDate, salary } =
    createEmployeeBodySchema.parse(request.body)

  try {
    const employeeRepository = new PrismaEmployeeRepository()
    const createEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository)

    await createEmployeeUseCase.execute({
      name,
      email,
      department,
      salary,
      birth_date: birthDate,
    })
  } catch (error) {
    if (error instanceof EmployeeAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }
    throw error
  }

  return reply.status(201).send()
}
