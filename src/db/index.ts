//import { PrismaClient } from '@prisma/client'

//declare global {
//  // eslint-disable-next-line no-var
//  var cachedPrisma: PrismaClient
//}

//let prisma: PrismaClient
//if (process.env.NODE_ENV === 'production') {
//  prisma = new PrismaClient()
//} else {
//  if (!global.cachedPrisma) {
//    global.cachedPrisma = new PrismaClient()
//  }
//  prisma = global.cachedPrisma
//}

////const   prisma = new PrismaClient()


//import { Pool, neonConfig } from '@neondatabase/serverless'
//import { PrismaNeon } from '@prisma/adapter-neon'
//import { PrismaClient } from '@prisma/client'
////import dotenv from 'dotenv'
//import ws from 'ws'

////dotenv.config()
//neonConfig.webSocketConstructor = ws
//const connectionString = `${process.env.DATABASE_URL}`

//const pool = new Pool({ connectionString })
//const adapter = new PrismaNeon(pool)
//const prisma = new PrismaClient({ adapter })

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//console.log("start")
//console.log(prisma)

export const db = prisma