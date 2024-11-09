import type { IEmployeeRepository } from '@/repositores/employees-repository'
import { format } from 'date-fns'

export class ListEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute() {
    const employees = await this.employeeRepository.list()
    const sanitizedEmployees = employees.map(
      ({ created_at, updated_at, birth_date, ...rest }) => ({
        ...rest,
        birth_date: format(new Date(birth_date), 'dd-MM-yyyy'),
      }),
    )
    return sanitizedEmployees
  }
}
