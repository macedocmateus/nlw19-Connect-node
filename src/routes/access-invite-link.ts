import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { env } from "../env";
import { accessInviteLink } from "../functions/access-invite-link";

export const accessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
    app.get(
        "/invites/:subscriberId",
        {
            schema: {
                summary: "Access invite link and redirects user",
                tags: ["referral"],
                description: "More details about this route",
                params: z.object({
                    subscriberId: z.string(),
                }),
                response: {
                    201: z.object({
                        subscriberId: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { subscriberId } = request.params;

            await accessInviteLink({ subscriberId });

            const redirectUrl = new URL(env.WEB_URL);

            redirectUrl.searchParams.set("referrer", subscriberId);

            // 301: redirect permanente, ou seja, o navegador sempre irá redirecionar sem precisar redirecionar a rota pois é feito um cache

            // 302: redirect temporário não faz o cache o navegador precisa toda vez redirecionar

            return reply.redirect(redirectUrl.toString(), 302);
        }
    );
};
