import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(
      z.object({
        username: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User ${input.username} not found`,
        });
      }

      return filterUserForClient(user);
    }),
  updateBio: privateProcedure
    .input(z.object({ bio: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await clerkClient.users.updateUser(ctx.userId, {
        publicMetadata: { bio: input.bio },
      });
    }),
});
