import type { IEmployeeRepository } from '@/repositores/employees-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { format } from 'date-fns'

interface IListUniqueEmployeeUseCaseRequest {
  id: string
}

export class ListUniqueEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute({ id }: IListUniqueEmployeeUseCaseRequest) {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new ResourceNotFoundError()
    }

    const { created_at, updated_at, birth_date, ...sanitizedEmployee } =
      employee

    return {
      ...sanitizedEmployee,
      birth_date: format(new Date(birth_date), 'dd-MM-yyyy'),
    }
  }
}
