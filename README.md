# SSYS Employee Manager

Após clonar o respositório, execute os seguintes comandos:

```bash
cd api
docker-compose up --build

```

Acessar http://localhost:3333/users para criar um usuário adm para autenticação, abaixo modelo do body da requisição

```json
{
  "name": "adm",
  "email": "adm@ssys.com.br",
  "password": "123456"
}
```

Acessar http://localhost:3333/sessions para fazer autenticação, abaixo modelo do body da requisição que retorna o Token para utilizar nas demais requisições do sistema:

```json
{
  "email": "adm@ssys.com.br",
  "password": "123456"
}
```

Modelo de resposta:

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmYwOTNjMC0zOGMxLTQ2YTUtYTk0MS00MWJiM2IwMjg0NmQiLCJpYXQiOjE3MzExMTUwMjR9.Qtpgntt4JJ1sFn4TxYK3iIwTUqtxO9jVXqDZrQ_NG2I"
}
```

**_Todas as demais chamadas deverão conter o bearer token_**

- GET: http://localhost:3333/employees (employee list)
- POST: http://localhost:3333/employees (employee create)
  Modelo do body da requisição

```json
{
  "name": "Anakin Skywalker",
  "email": "skywalker@ssys.com.br",
  "department": "Architecture",
  "salary": 4000.0,
  "birthDate": "1983-01-01"
}
```

- UPDATE http://localhost:3333/employees/ID (employee update)

```json
{
  "name": "Anakin Skywalker",
  "email": "skywalker@ssys.com.br",
  "department": "DevOps",
  "salary": 6000.0,
  "birthDate": "1983-01-01"
}
```

- DELETE http://localhost:3333/employees/ID (employee delete)
- GET http://localhost:3333/employees/ID (employee detail)
- GET http://localhost:3333/reports/employees/salary (salary report)
- GET http://localhost:3333/reports/employees/age (age report)

## Tecnologias utilizadas no projeto:

- Node.js
- TypeScript
- Fastify
- Zod
- Prisma ORM
- Postgres DB
- Docker
- Autenticação por JWT
