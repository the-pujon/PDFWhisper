import { cn } from '@/lib/utils'
import React,{ ReactNode } from 'react'

const WidthWrapper = ({
    children,
    className
}: {
    className?: string,
    children: ReactNode
}) => {
    return (
        <div className={cn(`mx-auto w-full max-w-screen-2xl px-3 md:px-20 ${className}`)} >
            {children}
        </div>
    )
}

export default WidthWrapper