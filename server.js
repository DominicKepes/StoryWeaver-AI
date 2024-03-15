require("dotenv").config();

const result = require("dotenv").config();

if (result.error) {
  console.error("Error loading .env file:", result.error);
}

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const cors = require("cors");

const db = require("./server/config/connection.js");
const typeDefs = require("./server/graphql/schemas/typeDefs.js");
const resolvers = require("./server/graphql/schemas/resolvers.js");
const { authMiddleware } = require("./server/utils/authMiddleware.js");
const generateCharacterSheetRouter = require("./server/api/generateCharacterSheet.js");
const apiKeyRouter = require("./server/api/routes/openaiRoute.js");
const { OpenAI } = require("openai");

const openaiApiKey = process.env.OPENAI_API_KEY;
console.log(`openaiApiKey: ${openaiApiKey}`);

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: {
  //   origin: ["http://localhost:5173", "https://studio.apollographql.com"],
  //   credentials: true,
  // },
  context: authMiddleware,
});

const startApolloServer = async () => {
  await server.start();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // app.use(cors());

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );

  // POST route for generateCharacterSheet
  app.use("/api/generateCharacterSheet", generateCharacterSheetRouter);
  app.use("/api/openai-api-key", apiKeyRouter);

  // GET route for generateCharacterSheet (handling not allowed method)
  app.get("/api/generateCharacterSheet", (req, res) => {
    res.status(405).json({ message: "GET method not allowed for this route." });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }
  // Global error handling middleware
  // app.use((err, req, res, next) => {
  //   console.error(err.stack); // Log error stack trace to console
  //   res.status(500).send("Something broke!");
  // });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();