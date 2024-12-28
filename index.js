import cors from "cors"; // Cross Origin Resource Sharing - Quem vai poder fazer requisições para o meu servidor
import * as dotenv from "dotenv"; // esconder e acessar variáveis de ambiente
import express from "express";
import connectToDB from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";

dotenv.config();

connectToDB();

const app = express();

app.use(cors()); // cors() => Aceita a requisição de TODO MUNDO
app.use(express.json()); // configuração do servidor para aceitar e receber arquivos em json

//criar rotas
app.use("/user", userRouter);
app.use("/event", eventRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server up and running at port ${process.env.PORT}`);
});
