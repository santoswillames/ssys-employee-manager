import { PrismaEmployeeRepository } from '@/repositores/prisma/prisma-employees-repository'
import { ListEmployeeUseCase } from '@/use-cases/list-employee-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function listEmployee(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const employeeRepository = new PrismaEmployeeRepository()
  const listEmployeeUseCase = new ListEmployeeUseCase(employeeRepository)

  const employees = await listEmployeeUseCase.execute()
  return reply.status(200).send(employees)
}
