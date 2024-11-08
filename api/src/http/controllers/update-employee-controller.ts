import { PrismaEmployeeRepository } from '@/repositores/prisma/prisma-employees-repository'
import { EmployeeEmailAlreadyExistsError } from '@/use-cases/errors/employee-email-already-exists-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { UpdateEmployeeUseCase } from '@/use-cases/update-employee-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateEmployeeBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    department: z.string().optional(),
    salary: z.number().min(1),
    birthDate: z.string().date().optional(),
  })

  const updateEmployeeParamsSchema = z.object({
    id: z.string(),
  })

  const { name, email, department, birthDate, salary } =
    updateEmployeeBodySchema.parse(request.body)
  const { id } = updateEmployeeParamsSchema.parse(request.params)

  try {
    const employeeRepository = new PrismaEmployeeRepository()
    const updateEmployeeUseCase = new UpdateEmployeeUseCase(employeeRepository)

    await updateEmployeeUseCase.execute({
      id,
      name,
      email,
      department,
      salary,
      birthDate,
    })
  } catch (error) {
    if (
      error instanceof EmployeeEmailAlreadyExistsError ||
      error instanceof ResourceNotFoundError
    ) {
      return reply.status(409).send({
        message: error.message,
      })
    }
    throw error
  }

  return reply.status(204).send()
}
