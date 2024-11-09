import { prisma } from '@/lib/prisma'
import type { Employee, Prisma } from '@prisma/client'
import type { IEmployeeRepository } from '../employees-repository'

export class PrismaEmployeeRepository implements IEmployeeRepository {
  async findByYounger(): Promise<Employee | null> {
    const youngestEmployee = await prisma.employee.findFirst({
      orderBy: {
        birth_date: 'desc',
      },
    })
    return youngestEmployee
  }

  async findByOlder(): Promise<Employee | null> {
    const oldestEmployee = await prisma.employee.findFirst({
      orderBy: {
        birth_date: 'asc',
      },
    })

    return oldestEmployee
  }

  async findByLowestSalary(): Promise<Employee | null> {
    const lowestSalaryEmployee = await prisma.employee.findFirst({
      orderBy: {
        salary: 'asc',
      },
    })

    return lowestSalaryEmployee
  }

  async findByHighestSalary(): Promise<Employee | null> {
    const highestSalaryEmployee = await prisma.employee.findFirst({
      orderBy: {
        salary: 'desc',
      },
    })

    return highestSalaryEmployee
  }

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

  async findByEmail(email: string) {
    const employee = await prisma.employee.findUnique({
      where: {
        email,
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
