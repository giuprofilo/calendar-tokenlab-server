import express from "express";
import userModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import generateToken from "../config/jwt.config.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

// variáveis em MAISCULO são consideradas GERAIS
const SALT_ROUNDS = 10; // quão complexo queremos que o salt seja criado || maior o numero MAIOR a demora na criação da hash

//criar conta
userRouter.post("/signup", async (req, res) => {
  try {
    const form = req.body;
    console.log(form);

    //confirmar se email e senha existem
    if (!form.email || !form.password) {
      throw new Error("Por favor, envie um email e uma senha");
    }

    //confirmar se a senha e segura
    //match -> retorna true se passou na regex, ou false se nao passar
    if (
      form.password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm //REGEX
      ) === false
    ) {
      throw new Error(
        "A senha não preenche os requisitos básicos. 8 caracteres. Maiuscula e minuscula. Numeros e caracteres especiais."
      );
    }

    //gerar salt
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);

    //encriptando a senha com a biblioteca bcryptjs + salt
    const hashedPassword = await bcryptjs.hash(form.password, salt);

    const user = await userModel.create({
      ...form,
      passwordHash: hashedPassword, //guardar a senha haseada na DB
    });

    user.passwordHash = undefined; //para nao retornar o passwordHash
    return res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
});

//fazer login
userRouter.post("/login", async (req, res) => {
  try {
    const form = req.body;

    //verificr se existe email e senhaa
    if (!form.email || !form.password) {
      throw new Error("Por favor, preencha todos os dados!");
    }

    // procuro o user pelo email dentro do banco de dados
    const user = await userModel.findOne({ email: form.email });

    //compare() também retorna TRUE se for igual as senhas e retorna FALSE se a senha não foi igual!!
    if (await bcryptjs.compare(form.password, user.passwordHash)) {
      //senhas iguais, pode fazer login

      //gerar um token
      const token = generateToken(user);

      user.passwordHash = undefined;

      return res.status(200).json({
        user: user,
        token: token,
      });
    } else {
      //senhas diferentes, não pode fazer login
      throw new Error(
        "Email ou senha não são válidos. Por favor tenta novamente."
      );
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err.message);
  }
});

//get all users
userRouter.get("/get_all", isAuth, async (req, res) => {
  try {
    const allUsers = await userModel.find();

    return res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

//get user by id
userRouter.get("/profile", isAuth, async (req, res) => {
  try {
    const id_user = req.auth._id;

    const user = await userModel
      .findById(id_user)
      .select("-passwordHash")
      .populate("eventos");

    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//edit user
userRouter.put("/edit", isAuth, async (req, res) => {
  try {
    const id_user = req.auth._id;

    const updatedUser = await userModel.findByIdAndUpdate(
      id_user,
      { ...req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
export default userRouter;
