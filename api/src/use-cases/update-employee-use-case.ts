import { IEmployeeRepository } from '@/repositores/employees-repository'
import { EmployeeEmailAlreadyExistsError } from './errors/employee-email-already-exists-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { parse } from 'date-fns'

interface IEmployeeUseCaseRequest {
  id: string
  name?: string
  email?: string
  department?: string
  salary: number
  birthDate?: string
}

export class UpdateEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute({
    id,
    name,
    email,
    department,
    salary,
    birthDate,
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

    const formattedBirthDate = birthDate
      ? parse(birthDate, 'yyyy-MM-dd', new Date())
      : birthDate

    await this.employeeRepository.update({
      id,
      name,
      email,
      department,
      salary,
      birth_date: formattedBirthDate,
    })
  }
}
