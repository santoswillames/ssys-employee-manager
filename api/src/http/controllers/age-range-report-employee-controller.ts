import { PrismaEmployeeRepository } from '@/repositores/prisma/prisma-employees-repository'
import { AgeRangeReportEmployeeUseCase } from '@/use-cases/age-range-report-employee-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function ageRangeReportEmployee(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const employeeRepository = new PrismaEmployeeRepository()
  const ageRangeReportEmployeeUseCase = new AgeRangeReportEmployeeUseCase(
    employeeRepository,
  )

  const ageRange = await ageRangeReportEmployeeUseCase.execute()
  return reply.status(200).send(ageRange)
}
