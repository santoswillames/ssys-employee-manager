import { PrismaEmployeeRepository } from '@/repositores/prisma/prisma-employees-repository'
import { DeleteEmployeeUseCase } from '@/use-cases/delete-employee-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = deleteParamsSchema.parse(request.params)

  try {
    const employeeRepository = new PrismaEmployeeRepository()
    const deleteUseCase = new DeleteEmployeeUseCase(employeeRepository)

    await deleteUseCase.execute({ id })
    return reply.status(200).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
