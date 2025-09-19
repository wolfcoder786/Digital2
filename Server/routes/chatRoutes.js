import express from "express";
import Chat from "../model/Chat.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();

// Get chat history for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.user.id });
    res.json(chat ? chat.messages : []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching chat history" });
  }
});

// Save new message
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { sender, text, image, language } = req.body;

    let chat = await Chat.findOne({ userId: req.user.id });
    if (!chat) {
      chat = new Chat({ userId: req.user.id, messages: [] });
    }

    chat.messages.push({ sender, text, image, language });
    await chat.save();

    res.json(chat.messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving chat" });
  }
});

export default router;
