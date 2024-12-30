import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, // match = regex
    },

    telefone: { type: String, required: true, trim: true },

    passwordHash: { type: String, required: true },

    active: { type: Boolean, default: true },
    eventos: [{ type: Schema.Types.ObjectId, ref: "Event" }], // Adicionando referência para eventos
  },
  { timestamps: true }
);

export default model("User", userSchema);
