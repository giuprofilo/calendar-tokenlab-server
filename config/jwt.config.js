import jwt from "jsonwebtoken";

export default function generateToken(user) {
  // user._id user.email  user.name

  // assinatura
  const signature = process.env.TOKEN_SIGN_SECRET;

  // expiration time = 20m / 1h / 12h / 10d / 365d
  const expiration = "12h";

  //criando o token
  return jwt.sign(
    {
      //payload -> infos que eu quero guardar dentro do token
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    signature, //assinatura do token
    {
      //obj de configuração determinando a validade do token
      expiresIn: expiration,
    }
  );
}
