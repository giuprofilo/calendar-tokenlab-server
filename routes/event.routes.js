import express from "express";
import mongoose from "mongoose";
import userModel from "../model/user.model.js";
import eventsModel from "../model/events.model.js";
import isAuth from "../middlewares/isAuth.js";

const eventRouter = express.Router();

//rota p criar um evento
eventRouter.post("/create", isAuth, async (req, res) => {
  try {
    const form = req.body; // Receber os dados do formulário
    const id_user = req.auth._id;

    // Verificar conflitos de horário
    const conflictingEvents = await eventsModel.find({
      user: mongoose.Types.ObjectId(id_user),
      $or: [
        { dateStart: { $lt: form.dateEnd, $gte: form.dateStart } },
        { dateEnd: { $gt: form.dateStart, $lte: form.dateEnd } },
      ],
    });
    if (conflictingEvents.length > 0) {
      return res.status(400).json({
        error: "Conflito de horário: já existe um evento nesse horário.",
      });
    }
    // Criar o novo evento
    const eventCreated = await eventsModel.create({
      ...form,
      user: id_user,
    });
    // Adicionar o evento ao usuário
    await userModel.findByIdAndUpdate(id_user, {
      $push: { eventos: eventCreated._id },
    });
    return res.status(201).json(eventCreated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default eventRouter;

// //funcao pre para verificar conflito de eventos antes de salvar o evento
// eventSchema.pre("save", async function (next) {
//   const event = this;

//   //busca eventos conflitantes no bd
//   const eventsConf = await model("Event").find({
//     user: event.user,
//     $or: [
//       //$lt: event.dateEnd verifica se o evento existente comeca antes do novo terminar
//       //$gte: event.dateStart verifica se o evento existente comeca depois do novo comecar ou na mesma hora
//       { dateStart: { $lt: event.dateEnd, $gte: event.dateStart } },
//       { dateEnd: { $gt: event.dateStart, $lte: event.dateEnd } },
//     ],
//   });

//   //se houver eventos conflitantes, manda o erro
//   if (eventsConf.length > 0) {
//     const error = new Error(
//       "Conflito de eventos: já existe um evento nesse horário"
//     );
//     return next(error);
//   }
//   //se nao houver conflitos, salva o evento
//   next();
//
