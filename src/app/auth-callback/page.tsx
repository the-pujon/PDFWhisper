"use client"

import { useRouter,useSearchParams } from 'next/navigation'
import React from 'react'
import { trpc } from '../_trpc/client';
import { FiLoader } from "react-icons/fi"

const Page = () => {

  const router = useRouter()

  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  trpc.authCallback.useQuery(undefined,{
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to db
        router.push(origin ? `/${origin}` : '/dashboard')
      }
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        router.push('/sign-in')
      }
    },
    retry: true,
    retryDelay: 500,
  })


  return (
    <div className='h-[90vh] flex flex-col items-center justify-center ' >
      <FiLoader className={`text-7xl text-primary animate-spin`} />
      <p>Please Wait...</p>
    </div>
  )
}

export default Page