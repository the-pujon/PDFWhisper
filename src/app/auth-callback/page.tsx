"use client"

import { useRouter,useSearchParams } from 'next/navigation'
import React from 'react'
import { trpc } from '../_trpc/client';
import { FiLoader } from "react-icons/fi"

const Page = () => {

  const router = useRouter()

  const searchParams = useSearchParams()
  const origin = searchParams.get('origin')

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to db
        router.push(origin ? `/${origin}` : '/dashboard')
      }
    },
    retry: (failureCount, err) => {
      if (err.message === "UNAUTHORIZED") {
        // stop retrying on Unauthorized, report in onError
        return false
      } else {
        // also keep retrying
        return true
      }
    },
    retryDelay: 500,
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        router.push('/sign-in')
      }
    },
  })



  return (
    <div className='h-[90vh] flex flex-col items-center justify-center ' >
      <FiLoader className={`text-7xl text-primary animate-spin`} />
      <p>Please Wait...</p>
    </div>
  )
}

export default Page