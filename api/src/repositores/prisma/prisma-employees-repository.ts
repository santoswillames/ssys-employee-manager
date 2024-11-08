import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { IEmployeeRepository } from '../employees-repository'

export class PrismaEmployeeRepository implements IEmployeeRepository {
  async list() {
    const employees = await prisma.employee.findMany()
    return employees
  }

  async update(data: Prisma.EmployeeUpdateInput) {
    const { id, ...updateData } = data as { id: string }

    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data: updateData,
    })

    return employee
  }

  async delete(id: string) {
    await prisma.employee.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string) {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    })

    return employee
  }

  async create(data: Prisma.EmployeeCreateInput) {
    const employee = await prisma.employee.create({
      data,
    })

    return employee
  }
}
