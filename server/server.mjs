import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { typeDefs } from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";

const app = express();
const httpServer = http.createServer(app);

// Connect to database
const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ldplopi.mongodb.net/`;
const PORT = process.env.PORT || 4000;

// schema
// resolver
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(), bodyParser.json(), expressMiddleware(server));

mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("🚀 Connected to the database");
        await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
        console.log(`🚀 Server ready at http://localhost:${PORT}`);
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
