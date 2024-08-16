import mongoose from "mongoose";

const SingleIconSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  income_source: { type: String, required: true },
  amount: { type: Number, required: true },
  img: String, // Optional image field
});

const SingleIcon =
  mongoose.models.SingleIcon || mongoose.model("SingleIcon", SingleIconSchema);

export default SingleIcon;
