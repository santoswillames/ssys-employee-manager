import type { IEmployeeRepository } from '@/repositores/employees-repository'
import { format } from 'date-fns'

export class SalaryRangeReportEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute() {
    let average = 0
    let lowSalaryEmployee = null
    let highSalaryEmployee = null

    const lowestSalaryEmployee =
      await this.employeeRepository.findByLowestSalary()
    const highestSalaryEmployee =
      await this.employeeRepository.findByHighestSalary()

    if (lowestSalaryEmployee) {
      const {
        created_at,
        updated_at,
        birth_date,
        ...sanitizedLowestSalaryEmployee
      } = lowestSalaryEmployee

      lowSalaryEmployee = {
        ...sanitizedLowestSalaryEmployee,
        birth_date: format(new Date(birth_date), 'dd-MM-yyyy'),
      }
    }

    if (highestSalaryEmployee) {
      const {
        created_at,
        updated_at,
        birth_date,
        ...sanitizedHighestSalaryEmployee
      } = highestSalaryEmployee

      highSalaryEmployee = {
        ...sanitizedHighestSalaryEmployee,
        birth_date: format(new Date(birth_date), 'dd-MM-yyyy'),
      }
    }

    if (lowSalaryEmployee && highSalaryEmployee) {
      average =
        (Number(lowSalaryEmployee.salary) + Number(highSalaryEmployee.salary)) /
        2
    } else if (!lowSalaryEmployee && highSalaryEmployee) {
      average = Number(highSalaryEmployee.salary)
    } else {
      average = Number(lowSalaryEmployee?.salary)
    }

    return {
      lowest: lowSalaryEmployee,
      highest: highSalaryEmployee,
      average,
    }
  }
}
