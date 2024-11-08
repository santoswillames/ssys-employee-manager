import { FastifyInstance } from 'fastify'
import { register } from './controllers/register-controller'
import { authenticate } from './controllers/authenticate-controller'
import { createEmployee } from './controllers/create-employee-controller'
import { verifyJWT } from './middlewares/verify-jwt'
import { updateEmployee } from './controllers/update-employee-controller'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /* Authenticated */
  app.post('/employees', { onRequest: [verifyJWT] }, createEmployee)
  app.put('/employees/:id', { onRequest: [verifyJWT] }, updateEmployee)
}
