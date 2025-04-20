import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
    validatorCompiler,
    serializerCompiler,
    ZodTypeProvider,
    jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

// Responsável por fazer a serialização, transforma os dados antes de enviar para o frontend
app.setSerializerCompiler(serializerCompiler);

// Responsável por fazer a validação utilizando o zod como plugin para fastify
app.setValidatorCompiler(validatorCompiler);

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "NLW Connect",
            version: "0.0.1",
        },
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
});

app.register(subscribeToEventRoute);

app.register(fastifyCors, {
    // Somente as URLs desse frontend poderá acessar este backend em especifico
    origin: "http://localhost:3333",
});

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server running");
});
