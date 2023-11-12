"use client"
import React,{ PropsWithChildren,useState } from 'react'
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import { trpc } from '@/app/_trpc/client'
import { httpBatchLink } from "@trpc/client"

const Provider = ({ children }: PropsWithChildren) => {
    const [queryClient] = useState(() => new QueryClient())
    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'https://pdf-whisper-eight.vercel.app/api/trpc'
                })
            ]
        })
    )


    return (
        <trpc.Provider queryClient={queryClient} client={trpcClient} >
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </trpc.Provider>

    )
}

export default Provider