import type { IEmployeeRepository } from '@/repositores/employees-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IDeleteEmployeeUseCaseRequest {
  id: string
}

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute({ id }: IDeleteEmployeeUseCaseRequest) {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new ResourceNotFoundError()
    }

    await this.employeeRepository.delete(id)
  }
}
