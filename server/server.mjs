import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import mongoose from "mongoose";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

import dotenv from "dotenv";
dotenv.config();
import { typeDefs } from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";
import "./firebaseConfig.js";
import { getAuth } from "firebase-admin/auth";

const app = express();
const httpServer = http.createServer(app);

// Connect to database
const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ldplopi.mongodb.net/`;
const PORT = process.env.PORT || 4000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create WebSocket server
const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
    // typeDefs,
    // resolvers,
    schema,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});

await server.start();

const authorizationJWT = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    console.log("authorizationHeader:", authorizationHeader);

    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(" ")[1];

        getAuth()
            .verifyIdToken(accessToken)
            .then((decodedToken) => {
                console.log("Decoded Token:", decodedToken);
                // req.user = decodedToken; yTwQ7vrBQfPu38n6tufopWIIWQo1
                res.locals.uid = decodedToken.uid;
                next();
            })
            .catch((error) => {
                console.error("Error verifying token:", error);
                return res.status(403).json({ error: "Forbidden" });
            });
    } else {
        next();
        // return res.status(401).json({ error: "Unauthorized" });
    }
};

app.use(
    cors(),
    authorizationJWT,
    bodyParser.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => ({ uid: res.locals.uid }),
    }),
);

mongoose
    .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("🚀 Connected to the database");
        await new Promise((resolve) => httpServer.listen(PORT, "0.0.0.0", resolve));
        console.log(`🚀 Server ready at port ${PORT}`);
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
