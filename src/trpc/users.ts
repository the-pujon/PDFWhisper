import { privateProcedure,publicProcedure,router } from './trpc';
import { TRPCError } from "@trpc/server"
import { db } from '@/db';
import { z } from 'zod';

export const userRouter = router({
    /**
     * updating user role
     */
    updateUserRole: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
        const { id } = input

        const file = await db.user.update({
            data: {
                role: 'admin'
            },
            where: {
                id: id
            }
        })

        if (!file) throw new TRPCError({ code: 'NOT_FOUND' })

        return file
    }),

    /**
     * getting all users
     */
    getUsers: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx

        const admin = await db.user.findFirst({
            where: {
                id: userId
            }
        })

        if (admin?.role !== 'admin') throw new TRPCError({ code: 'UNAUTHORIZED' })

        const users = await db.user.findMany()

        return users

    }),

    /**
    * for checking admin or not
    */
    getAdmin: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx;
        return await db.user.findFirst({
            where: {
                id: userId
            }
        })
    }),

    /**
     * for deleting user
     */
    deleteUser: privateProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx,input }) => {
        const { userId } = ctx
        const { id } = input

        const admin = await db.user.findFirst({
            where: {
                id: userId
            }
        })

        if (admin?.role !== 'admin') throw new TRPCError({ code: 'UNAUTHORIZED' })

        return await db.user.delete({
            where: {
                id: id
            }
        })


    })
})
