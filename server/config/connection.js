require("dotenv").config();
const mongoose = require('mongoose');
require('dotenv').config()

const uri = `mongodb+srv://dominickepes:${process.env.MONGO_PASS}@cluster0.egtkwdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)

module.exports = mongoose.connection;
