import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register-controller'
import { authenticate } from './controllers/authenticate-controller'
import { createEmployee } from './controllers/create-employee-controller'
import { verifyJWT } from './middlewares/verify-jwt'
import { updateEmployee } from './controllers/update-employee-controller'
import { listEmployee } from './controllers/list-employee-controller'
import { listUniqueEmployee } from './controllers/list-unique-employee-controller'
import { deleteEmployee } from './controllers/delete-employee-controller'
import { ageRangeReportEmployee } from './controllers/age-range-report-employee-controller'
import { salaryRangeReportEmployee } from './controllers/salary-range-report-employee-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Authenticated */
  app.get('/employees', { onRequest: [verifyJWT] }, listEmployee)
  app.get('/employees/:id', { onRequest: [verifyJWT] }, listUniqueEmployee)
  app.post('/employees', { onRequest: [verifyJWT] }, createEmployee)
  app.put('/employees/:id', { onRequest: [verifyJWT] }, updateEmployee)
  app.delete('/employees/:id', { onRequest: [verifyJWT] }, deleteEmployee)

  app.get(
    '/reports/employees/age',
    { onRequest: [verifyJWT] },
    ageRangeReportEmployee,
  )
  app.get(
    '/reports/employees/salary',
    { onRequest: [verifyJWT] },
    salaryRangeReportEmployee,
  )
}
