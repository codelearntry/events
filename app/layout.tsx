import 'server-only'

import SupabaseListener from '../src/supabase/listener'
import createClient from '../src/supabase/server'
import Footer from './Footer'
import './globals.css'
import NavBar from './NavBar'

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang='en' className='w-full h-full bg-gray-300 '>
      <head />
      <body className='flex flex-col justify-between w-full h-full'>
        <SupabaseListener accessToken={session?.access_token} /> <NavBar />
        <main className='flex-grow p-6 '>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
