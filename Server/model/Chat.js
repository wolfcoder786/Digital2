// models/Chat.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ["bot", "user"], required: true },
  text: { type: String, default: "" }, // not always required (image uploads, etc.)
  image: { type: String }, // base64 / URL for uploaded images
  language: { type: String, default: "en" }, // optional (since you support ML + EN)
  timestamp: { type: Date, default: Date.now },
});

const chatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    messages: [messageSchema],
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export default mongoose.model("Chat", chatSchema);
