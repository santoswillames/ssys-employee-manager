import type { IEmployeeRepository } from '@/repositores/employees-repository'
import { differenceInYears, format } from 'date-fns'

export class AgeRangeReportEmployeeUseCase {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute() {
    const currentDate = new Date()

    let average = 0
    let ageYounger = 0
    let ageOlder = 0
    let youngerEmployee = null
    let olderEmployee = null

    const youngestEmployee = await this.employeeRepository.findByYounger()
    const oldestEmployee = await this.employeeRepository.findByOlder()

    if (youngestEmployee) {
      const {
        created_at,
        updated_at,
        birth_date,
        ...sanitizedYoungestEmployee
      } = youngestEmployee

      youngerEmployee = {
        ...sanitizedYoungestEmployee,
        birth_date: format(new Date(birth_date), 'dd-MM-yyyy'),
      }

      const birthDate = new Date(birth_date)

      ageYounger = differenceInYears(currentDate, birthDate)
    }

    if (oldestEmployee) {
      const { created_at, updated_at, birth_date, ...sanitizedOldestEmployee } =
        oldestEmployee

      olderEmployee = {
        ...sanitizedOldestEmployee,
        birth_date: format(new Date(birth_date), 'dd-MM-yyyy'),
      }

      const birthDate = new Date(birth_date)

      ageOlder = differenceInYears(currentDate, birthDate)
    }

    if (youngerEmployee && olderEmployee) {
      average = (ageYounger + ageOlder) / 2
    } else if (!youngerEmployee && olderEmployee) {
      average = ageOlder
    } else {
      average = ageYounger
    }

    return {
      younger: youngerEmployee,
      older: olderEmployee,
      average,
    }
  }
}
