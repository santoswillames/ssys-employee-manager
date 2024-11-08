import { IEmployeeRepository } from '@/repositores/employees-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

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

    const { created_at, updated_at, ...sanitizedEmployee } = employee

    return sanitizedEmployee
  }
}
