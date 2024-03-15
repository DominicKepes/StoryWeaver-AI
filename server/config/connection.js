require("dotenv").config();
const mongoose = require('mongoose');

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

module.exports = mongoose.connection;
