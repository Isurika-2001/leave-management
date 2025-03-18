// server.js
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = require("./app"); // Import app from app.js

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
