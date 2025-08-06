import { Loader2 } from 'lucide-react'
import  Image  from 'next/image'
import { SignIn, ClerkLoaded,  ClerkLoading} from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-r from-green-100 via-white'>
      {/* Left col */}
      <div className='h-full lg:flex flex-col items-center justify-center px-4'>
        <div className='text-center space-y-4 pt-16'>
          <h1 className='font-bold text-3xl text-[#2E2A47]'>
            Welcome back !
          </h1>
          <p className='text-base text-[#7E8CA0]'>
            Log in or Create account to get back to your dashboard
          </p>
        </div>
        <div className='flex items-center justify-center mt-8'>
          <ClerkLoaded>
            <SignIn path='/sign-in'/>
          </ClerkLoaded>
          <ClerkLoading>
              <Loader2 className='animate-spin text-muted-foreground'/>
          </ClerkLoading>
        </div>
      </div>
      {/* Right col */}
      <div className='h-full bg-gradient-to-r from-white to-blue-100 hidden lg:flex items-center justify-center'>
        <Image alt='logo' src="/logo.png" height={400} width={400}/>
      </div>
    </div>
  )
}