//import { createUploadthing,type FileRouter } from "uploadthing/next";
//import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
//import { db } from "@/db";
//import { pinecone } from "@/lib/pinecone";
//import { PDFLoader } from "langchain/document_loaders/fs/pdf"
//import { OpenAIEmbeddings } from "langchain/embeddings/openai"
//import { PineconeStore } from 'langchain/vectorstores/pinecone'

//const f = createUploadthing();

//export const ourFileRouter = {

//  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })

//    .middleware(async ({ req }) => {

//      const { getUser } = getKindeServerSession()
//      const user = getUser()

//      if (!user || !user.id) throw new Error("Unauthorized")

//      return { userId: user.id };
//    })
//    .onUploadComplete(async ({ metadata,file }) => {


//      const createdFile = await db.file.create({
//        data: {
//          name: file.name,
//          key: file.key,
//          userId: metadata.userId,
//          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
//          uploadStatus: "PROCESSING"
//        }
//      })




//      try {
//        const response = await fetch(
//          `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
//        )



//        const blob = await response.blob()


//        const loader = new PDFLoader(blob)


//        const pageLevelDocs = await loader.load()


//        const pagesAmt = pageLevelDocs.length




//        const pineconeIndex = pinecone.Index('pdf');

//        const embeddings = new OpenAIEmbeddings({
//          openAIApiKey: process.env.OPENAI_API_KEY,
//        });

//        const p = await PineconeStore.fromDocuments(pageLevelDocs,embeddings,{
//          pineconeIndex,
//        });


//        console.log(embeddings)
//        console.log(p)


//        await db.file.update({
//          data: {
//            uploadStatus: 'SUCCESS',
//          },
//          where: {
//            id: createdFile.id,
//          },
//        })
//      } catch (err) {

//        console.log(err)

//        await db.file.update({
//          data: {
//            uploadStatus: 'FAILED',
//          },
//          where: {
//            id: createdFile.id,
//          },
//        })
//      }


//    }),
//} satisfies FileRouter;

//export type OurFileRouter = typeof ourFileRouter;

import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import {
  createUploadthing,
  type FileRouter,
} from 'uploadthing/next'

import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
//import { getPineconeClient } from '@/lib/pinecone'
import { getUserSubscriptionPlan } from '@/lib/stripe'
import { SubscriptionPlan } from '@/config/stripe'
import { pinecone } from '@/lib/pinecone'

const f = createUploadthing()

const middleware = async () => {
  const { getUser } = getKindeServerSession()
  const user = getUser()

  if (!user || !user.id) throw new Error('Unauthorized')

  const subscriptionPlan = await getUserSubscriptionPlan()

  return { subscriptionPlan,userId: user.id }
}

const onUploadComplete = async ({
  metadata,
  file,
}: {
  metadata: Awaited<ReturnType<typeof middleware>>
  file: {
    key: string
    name: string
    url: string
  }
}) => {
  const isFileExist = await db.file.findFirst({
    where: {
      key: file.key,
    },
  })

  if (isFileExist) return

  const createdFile = await db.file.create({
    data: {
      key: file.key,
      name: file.name,
      userId: metadata.userId,
      url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
      uploadStatus: 'PROCESSING',
    },
  })

  try {
    const response = await fetch(
      `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
    )

    const blob = await response.blob()
    console.log('blob',blob)

    const loader = new PDFLoader(blob)
    console.log('loader',loader)

    const pageLevelDocs = await loader.load()
    console.log('pageLevelDocs',pageLevelDocs)

    const pagesAmt = pageLevelDocs.length
    console.log('pagesAmt',pagesAmt)

    const { subscriptionPlan } = metadata
    const { isSubscribed } = subscriptionPlan

    const isProExceeded =
      pagesAmt >
      SubscriptionPlan.find((plan) => plan.name === 'Pro')!.pagesPerPdf

    console.log('isProExceeded',isProExceeded)

    const isFreeExceeded =
      pagesAmt >
      SubscriptionPlan.find((plan) => plan.name === 'Free')!
        .pagesPerPdf

    console.log('isFreeExceeded',isFreeExceeded)

    if (
      (isSubscribed && isProExceeded) ||
      (!isSubscribed && isFreeExceeded)
    ) {
      await db.file.update({
        data: {
          uploadStatus: 'FAILED',
        },
        where: {
          id: createdFile.id,
        },
      })
    }

    // vectorize and index entire document
    //const pinecone = await getPineconeClient()
    const pineconeIndex = pinecone.Index('pdf')
    console.log('pineconeIndex',pineconeIndex)

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
    console.log('embeddings',embeddings)

    await PineconeStore.fromDocuments(
      pageLevelDocs,
      embeddings,
      {
        pineconeIndex,
      }
    )

    await db.file.update({
      data: {
        uploadStatus: 'SUCCESS',
      },
      where: {
        id: createdFile.id,
      },
    })
  } catch (err) {
    console.log(err)
    await db.file.update({
      data: {
        uploadStatus: 'FAILED',
      },
      where: {
        id: createdFile.id,
      },
    })
  }
}

export const ourFileRouter = {
  freePlanUploader: f({ pdf: { maxFileSize: '2MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
  proPlanUploader: f({ pdf: { maxFileSize: '4MB' } })
    .middleware(middleware)
    .onUploadComplete(onUploadComplete),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
