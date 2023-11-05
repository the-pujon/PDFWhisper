import { createUploadthing,type FileRouter } from "uploadthing/next";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from "@/db";

const f = createUploadthing();

export const ourFileRouter = {

  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })

    .middleware(async ({ req }) => {

      const { getUser } = getKindeServerSession()
      const user = getUser()

      if (!user || !user.id) throw new Error("Unauthorized")

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata,file }) => {

      const createFile = await db.file.create({
        data: {
          name: file.name,
          key: file.key,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING"
        }
      })

    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;