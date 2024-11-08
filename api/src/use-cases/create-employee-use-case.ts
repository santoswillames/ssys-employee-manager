import { IEmployeeRepository } from '@/repositores/employees-repository'
import { EmployeeAlreadyExistsError } from './errors/employee-already-exists-error'

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
      throw new EmployeeAlreadyExistsError()
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
