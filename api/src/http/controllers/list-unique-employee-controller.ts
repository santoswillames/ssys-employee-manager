import { PrismaEmployeeRepository } from '@/repositores/prisma/prisma-employees-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { ListUniqueEmployeeUseCase } from '@/use-cases/list-unique-employee-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listUniqueEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listUniqueEmployeeParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = listUniqueEmployeeParamsSchema.parse(request.params)

  try {
    const employeeRepository = new PrismaEmployeeRepository()
    const listUniqueEmployeeUseCase = new ListUniqueEmployeeUseCase(
      employeeRepository,
    )

    const employee = await listUniqueEmployeeUseCase.execute({ id })
    return reply.status(200).send(employee)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
