import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";

const app = fastify();

app.register(fastifyCors, {
    // Somente as URLs desse frontend poderá acessar este backend em especifico
    origin: "http://localhost:3000",
});

app.get("/hello", () => {
    return "hello world";
});

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server running");
});
