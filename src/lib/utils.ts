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


//export function constructMetadata({
//  title = "PDFWhisper - Unveiling Conversations Within the Pages",
//  description = "Unleash the power of conversation within your PDFs with PDFWhisper. Transform static files into dynamic dialogues for a revolutionary document experience.",
//  image = "/thumbnail.png",
//  //icons = "/favicon.png",
//  noIndex = false
//}: {
//  title?: string
//  description?: string
//  image?: string
//  icons?: string
//  noIndex?: boolean
//} = {}): Metadata {
//  return {
//    title,
//    description,
//    openGraph: {
//      title,
//      description,
//      images: [
//        {
//          url: image
//        }
//      ]
//    },
//    twitter: {
//      card: "summary_large_image",
//      title,
//      description,
//      images: [image],
//      creator: "@joshtriedcoding"
//    },
//    //icons,
//    metadataBase: new URL('https://quill-jet.vercel.app'),
//    themeColor: '#FFF',
//    ...(noIndex && {
//      robots: {
//        index: false,
//        follow: false
//      }
//    })
//  }
//}

export function constructMetadata({
  title = "PDFWhisper - Unveiling Conversations Within the Pages",
  description = "Unleash the power of conversation within your PDFs with PDFWhisper. Transform static files into dynamic dialogues for a revolutionary document experience.",
  image = "/thumbnail.png",
  icons = "/favicon.png",
  noIndex = false
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  const baseMetadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@joshtriedcoding"
    },
    facebook: {
      appId: 'your_facebook_app_id', // Replace with your Facebook App ID
    },
    linkedin: {
      site: 'your_linkedin_company_page', // Replace with your LinkedIn Company Page ID
    },
    discord: {
      serverId: 'your_discord_server_id', // Replace with your Discord Server ID
    },
    icons,
    metadataBase: new URL('https://quill-jet.vercel.app'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false
      }
    })
  };

  return baseMetadata;
}

// Assuming you have a viewport export
export const viewport = {
  themeColor: '#FFF',
};
