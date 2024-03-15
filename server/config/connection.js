require("dotenv").config();
const mongoose = require('mongoose');
require('dotenv').config()

const uri = `mongodb+srv://dominickepes:${process.env.MONGO_PASS}@cluster0.egtkwdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
// Connect to MongoDB
<<<<<<< HEAD
mongoose.connect(uri, clientOptions)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Define your Mongoose schemas and models here if needed

module.exports = mongoose.connection;

// // const mongoose = require('mongoose');
// // require('dotenv').config()
// // const uri = `mongodb+srv://dominickepes:${process.env.MONGO_PASS}@cluster0.egtkwdv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);
=======
mongoose.connect(process.env.MONGODB_URI)

module.exports = mongoose.connection;
>>>>>>> 23cf45adb7e1fcf09da456305ad7c990e418e3e4
