import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    description: { type: String, required: true },
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },

    // Referência ao usuário que criou o evento
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model("Event", eventSchema);
