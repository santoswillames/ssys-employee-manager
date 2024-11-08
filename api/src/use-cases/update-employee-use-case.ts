import { IEmployeeRepository } from '@/repositores/employees-repository'
import { EmployeeEmailAlreadyExistsError } from './errors/employee-email-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface IEmployeeUseCaseRequest {
  id: string
  name?: string
  email?: string
  department?: string
  salary: number
  birth_date?: string
}

export class UpdateEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute({
    id,
    name,
    email,
    department,
    salary,
    birth_date,
  }: IEmployeeUseCaseRequest) {
    const employee = await this.employeeRepository.findById(id)

    if (!employee) {
      throw new ResourceNotFoundError()
    }

    if (email) {
      const employeeWithSameEmail =
        await this.employeeRepository.findByEmail(email)

      if (employeeWithSameEmail && id !== employeeWithSameEmail.id) {
        throw new EmployeeEmailAlreadyExistsError()
      }
    }

    await this.employeeRepository.update({
      id,
      name,
      email,
      department,
      salary,
      birth_date,
    })
  }
}
