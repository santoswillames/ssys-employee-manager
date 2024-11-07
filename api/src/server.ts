import fastify from 'fastify'

const app = fastify()

app.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

app
  .listen({
    host: '0.0.0.0',
    port: 3000,
  })
  .then(() => {
    console.log('🚀 HTTP server running')
  })
