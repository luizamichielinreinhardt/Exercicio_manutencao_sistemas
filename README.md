# FootWear Tech - E-commerce de Tênis

Sistema de gestão (usuários, produtos e movimentos de estoque) com manutenção evolutiva:

- Campos `cpf` e `telefone` em `usuarios`
- `senha` e `cpf` criptografados com **crypto-js** (AES)
- Login (`POST /login`) com token de **90 minutos**; demais rotas exigem `Authorization: Bearer <token>`

## Como executar

```bash
cd backend
npm install
node sync.js      # recria as tabelas (MySQL, banco "ecom")
node index.js     # API em http://localhost:3000
```

Abra `frontend/index.html` (ex.: Live Server), faça o cadastro em *Usuários > Cadastrar* e entre em *Login*.
Os testes da API estão em `backend/teste.http` (REST Client).
