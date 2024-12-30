//express-jwt -> responsável por VALIDAR o token
import { expressjwt } from "express-jwt";
import * as dotenv from "dotenv";
dotenv.config();

export default expressjwt({
  secret: process.env.TOKEN_SIGN_SECRET, // Assinatura usada para validar o token
  algorithms: ["HS256"], // Algoritmo de criptografia
});

// REQ.AUTH -> as informações que estão dentro do token
