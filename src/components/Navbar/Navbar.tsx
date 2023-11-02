import Link from 'next/link'
import {
    LoginLink,
    RegisterLink,
    getKindeServerSession,
} from '@kinde-oss/kinde-auth-nextjs/server'
import WidthWrapper from '@/components/WidthWrapper/WidthWrapper'
import { buttonVariants } from '../ui/button'

const Navbar = () => {


    return (
        <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/50 backdrop-blur-lg transition-all'>
            <WidthWrapper>
                <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
                    <Link
                        href='/'
                        className='flex z-40 font-semibold'>
                        <span>PDFWhisper.</span>
                    </Link>

                    <div className='hidden items-center space-x-4 sm:flex'>

                        <>
                            <Link
                                href='/pricing'
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}>
                                Pricing
                            </Link>
                            <LoginLink
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}>
                                Sign in
                            </LoginLink>
                            <RegisterLink
                                className={buttonVariants({
                                    size: 'sm',
                                })}>
                                Get started{' '}

                            </RegisterLink>
                        </>

                        <>
                            <Link
                                href='/dashboard'
                                className={buttonVariants({
                                    variant: 'ghost',
                                    size: 'sm',
                                })}>
                                Dashboard
                            </Link>

                            {/*<UserAccountNav
                  name={
                    !user.given_name || !user.family_name
                      ? 'Your Account'
                      : `${user.given_name} ${user.family_name}`
                  }
                  email={user.email ?? ''}
                  imageUrl={user.picture ?? ''}
                />*/}
                        </>

                    </div>
                </div>
            </WidthWrapper>
        </nav>
    )
}

export default Navbar
