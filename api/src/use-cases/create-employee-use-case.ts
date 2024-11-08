import { IEmployeeRepository } from '@/repositores/employees-repository'
import { EmployeeEmailAlreadyExistsError } from './errors/employee-email-already-exists-error'
import { parse } from 'date-fns'

interface IEmployeeUseCaseRequest {
  name: string
  email: string
  department: string
  salary: number
  birthDate: string
}

export class CreateEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute({
    name,
    email,
    department,
    salary,
    birthDate,
  }: IEmployeeUseCaseRequest) {
    const employeeWithSameEmail =
      await this.employeeRepository.findByEmail(email)

    if (employeeWithSameEmail) {
      throw new EmployeeEmailAlreadyExistsError()
    }

    const formattedBirthDate = parse(birthDate, 'yyyy-mm-dd', new Date())

    await this.employeeRepository.create({
      name,
      email,
      department,
      salary,
      birth_date: formattedBirthDate,
    })
  }
}
