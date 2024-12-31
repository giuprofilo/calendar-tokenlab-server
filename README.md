# API RESTFUL + Token Based Auth

Servidor da etapa de desafio técnico da Tokenlab, criação de calendário de eventos utilizando Node, Express, JWT e Mongoose.

## Tecnologias utilizadas

1. NodeJS
2. Express
3. MongoDB (Banco de dados noSQL)
4. JWT (Autenticação)
5. Bcryptjs (Criptografia)

## Instalando o projeto

- Clone o repositório
- Execute o comando `npm install`
- Crie um arquivo `.env` baseado no arquivo `.exemple.env`
- Para colocar o servidor para rodar, execute o comando `npm run dev`

## API Endpoints

Todas as API estão listadas abaixo:

| Route                            | Descrição                               |
| -------------------------------- | --------------------------------------- |
| `POST /user/signup`              | Cria uma conta.                         |
| `POST /user/login`               | Autentica o login.                      |
| `POST /event/create`             | Cria um evento.                         |
| `PUT /event/edit/:id_event`      | Edita um evento.                        |
| `DELETE /event/delete/:id_event` | Deleta um evento.                       |
| `GET /user/profile`              | Get nos eventos do usuário autenticado. |
