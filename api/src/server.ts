import { app } from './app'
import { env } from './env'

app.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP server running')
  })
