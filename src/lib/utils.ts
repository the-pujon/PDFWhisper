import { type ClassValue,clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function absoluteUrl(path: string) {
  if (typeof window !== 'undefined') return path
  if (process.env.VERCEL_URL)
    return `https://pdf-whisper-puce.vercel.app${path}`
  return `http://localhost:${process.env.PORT ?? 3000
    }${path}`
}
