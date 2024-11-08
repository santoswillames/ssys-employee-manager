export class EmployeeEmailAlreadyExistsError extends Error {
  constructor() {
    super('Employee e-mail already exists')
  }
}
