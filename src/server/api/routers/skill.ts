import { clerkClient } from "@clerk/nextjs/server";
import type { Skill } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";

const addUserToSkills = async (skills: Skill[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: skills.map((skill) => skill.profileId),
    })
  ).map(filterUserForClient);

  return skills.map((skill) => {
    const profile = users.find((user) => user.id === skill.profileId);

    if (!profile || !profile.username)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User for skill not found",
      });

    return {
      skill,
      profile: {
        ...profile,
        username: profile.username,
      },
    };
  });
};

export const skillRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({ name: z.string().min(1).max(80), rating: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const skill = await ctx.prisma.skill.create({
        data: {
          name: input.name,
          ownRating: input.rating,
          profile: {
            connect: {
              id: ctx.userId,
            },
          },
        },
      });

      return skill;
    }),
  search: publicProcedure
    .input(z.object({ term: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const skills = await ctx.prisma.skill.findMany({
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
      });

      return addUserToSkills(skills);
    }),
  getSkillsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.skill.findMany({
        where: {
          profileId: input.userId,
        },
        take: 100,
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      })
    ),
});
