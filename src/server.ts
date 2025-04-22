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
import { env } from "./env";
import { accessInviteLinkRoute } from "./routes/access-invite-link-route";
import { getSubscriberInviteClicksRoute } from "./routes/get-subscriber-invite-clicks-route";
import { getSubscriberInvitesCountRoute } from "./routes/get-subscriber-invites-count-route";
import { getSubscriberRankingPositionRoute } from "./routes/get-subscriber-ranking-position-route";
import { getRankingRoute } from "./routes/get-ranking-route";

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
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);

app.register(fastifyCors, {
    // Somente as URLs desse frontend poderá acessar este backend em especifico
    origin: "http://localhost:3333",
});

app.listen({ port: env.PORT }).then(() => {
    console.log("HTTP server running");
});
