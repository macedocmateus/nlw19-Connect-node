import { z } from "zod";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getSubscriberInvitesCount } from "../functions/get-subscriber-invites-count";

export const getSubscriberInvitesCountRoute: FastifyPluginAsyncZod = async (
    app
) => {
    app.get(
        "/subscribers/:subscriberId/ranking/count",
        {
            schema: {
                summary: "Get subscriber invites count",
                tags: ["referral"],
                description: "More details about this route",
                params: z.object({
                    subscriberId: z.string(),
                }),
                response: {
                    200: z.object({
                        count: z.number(),
                    }),
                },
            },
        },
        async (request) => {
            const { subscriberId } = request.params;

            const { count } = await getSubscriberInvitesCount({ subscriberId });

            return { count };
        }
    );
};
