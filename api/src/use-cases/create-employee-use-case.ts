import { IEmployeeRepository } from '@/repositores/employees-repository'
import { EmployeeEmailAlreadyExistsError } from './errors/employee-email-already-exists-error'

interface IEmployeeUseCaseRequest {
  name: string
  email: string
  department: string
  salary: number
  birth_date: string
}

export class CreateEmployeeUseCase {
  constructor(private usersRepository: IEmployeeRepository) {}

  async execute({
    name,
    email,
    department,
    salary,
    birth_date,
  }: IEmployeeUseCaseRequest) {
    const employeeWithSameEmail = await this.usersRepository.findByEmail(email)

    if (employeeWithSameEmail) {
      throw new EmployeeEmailAlreadyExistsError()
    }

    await this.usersRepository.create({
      name,
      email,
      department,
      salary,
      birth_date,
    })
  }
}
