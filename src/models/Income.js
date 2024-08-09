import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  income_source: { type: String, required: true },
  amount: { type: Number, required: true },
  img: String, // Optional image field
});

const Income = mongoose.models.Income || mongoose.model("Income", IncomeSchema);

export default Income;
