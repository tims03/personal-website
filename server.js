const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Replace this with your actual MongoDB connection string
mongoose.connect(
  "mongodb+srv://timos360:<Star8PwoRAcHyb47>@cluster0.yfsum37.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define a MongoDB schema and model for messages
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Message = mongoose.model("Message", messageSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// Handle form submissions
app.post("/submit-message", async (req, res) => {
  const { name, email, message } = req.body;

  // Save the message to MongoDB
  const newMessage = new Message({ name, email, message });
  await newMessage.save();

  res.send("Message sent successfully!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose.set("debug", true);
