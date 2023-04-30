import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const skillRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1).max(80), rating: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.prisma.skill.create({
        data: {
          name: input.name,
          ownRating: input.rating,
          profile: {
            connect: {
              id: "dshlkdsnvldsknv",
            },
          },
        },
      });

      return skill;
    }),
  search: publicProcedure
    .input(z.object({ term: z.string().optional() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.skill.findMany({
        where: {
          name: {
            contains: input.term ? input.term : "",
          },
        },
        orderBy: [
          {
            updatedAt: "desc",
          },
        ],
        take: 20,
        include: {
          profile: {
            select: {
              id: true,
            },
          },
        },
      });
    }),
});
