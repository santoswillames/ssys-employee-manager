import { IEmployeeRepository } from '@/repositores/employees-repository'

export class ListEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute() {
    const employees = await this.employeeRepository.list()
    const sanitizedEmployees = employees.map(
      ({ created_at, updated_at, ...rest }) => rest,
    )
    return sanitizedEmployees
  }
}
