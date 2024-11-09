import { PrismaEmployeeRepository } from '@/repositores/prisma/prisma-employees-repository'
import { SalaryRangeReportEmployeeUseCase } from '@/use-cases/salary-range-report-employee-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function salaryRangeReportEmployee(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const employeeRepository = new PrismaEmployeeRepository()
  const salaryRangeReportEmployeeUseCase = new SalaryRangeReportEmployeeUseCase(
    employeeRepository,
  )

  const salaryRange = await salaryRangeReportEmployeeUseCase.execute()
  return reply.status(200).send(salaryRange)
}
