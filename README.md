# SSYS Employee Manager

Após clonar o respositório, execute dos seguntes comandos:
```bash
cd api
# Instalar as dependências
npm install
# Subir a imagem do banco com docker
docker compose up -d
# Criar as tabelas no banco 
npx prisma migrate dev
# Subir o servidor em desenvolvimento
npm run dev
```
Acessar http://localhost:3333/users para criar um usuário adm para autenticação, abaixo modelo do body da requisição
```json
{
    "name":"adm",
    "email":"adm@ssys.com.br",
    "password":"123456"
}
```
Acessar http://localhost:3333/sessions para fazer autenticação, abaixo modelo do body da requisição que retornar o Token para utilizar nas demais requisições do sistema:
```json
{
    "email":"adm@ssys.com.br",
    "password":"123456"
}
```
Modelo de resposta:
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwYmYwOTNjMC0zOGMxLTQ2YTUtYTk0MS00MWJiM2IwMjg0NmQiLCJpYXQiOjE3MzExMTUwMjR9.Qtpgntt4JJ1sFn4TxYK3iIwTUqtxO9jVXqDZrQ_NG2I"
}
```
***Todas as demais chamadas deverão conter o bearer token***
 - GET: http://localhost:3333/employees (employee list)
 - POST: http://localhost:3333/employees (employee create)
 - UPDATE http://localhost:3333/employees/ID (employee update)
 - DELETE http://localhost:3333/employees/ID (employee delete)
 - GET http://localhost:3333/employees/ID (employee detail)
 - GET http://localhost:3333/reports/employees/salary (salary report)
 - GET http://localhost:3333/reports/employees/age (age report)