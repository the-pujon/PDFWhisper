import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";
import { z } from "zod"

const SendMessageValidator = z.object({
    fileId: z.string(),
    message: z.string()
})

const POST = async (req: NextRequest) => {
    const body = await req.json()

    const { getUser } = getKindeServerSession()
    const user = getUser()



    const { id: userId } = user

    if (!userId)
        return new Response('Unauthorized',{ status: 401 })

    const { fileId,message } =
        SendMessageValidator.parse(body)

    const file = await db.file.findFirst({
        where: {
            id: fileId,
            userId,
        },
    })

    if (!file)
        return new Response('Not found',{ status: 404 })

    await db.message.create({
        data: {
            text: message,
            isUserMessage: true,
            userId,
            fileId,
        },
    })



}