import { Employee, Prisma } from '@prisma/client'

export interface IEmployeeRepository {
  create(data: Prisma.EmployeeCreateInput): Promise<Employee>
  list(): Promise<Employee[]>
  update(data: Prisma.EmployeeUpdateInput): Promise<Employee>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Employee | null>
  findByEmail(id: string): Promise<Employee | null>
}
