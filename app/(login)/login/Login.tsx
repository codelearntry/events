'use client'
import 'flowbite'
import { useRouter } from 'next/navigation'
import supabase from '../../../src/supabase/browser'

const Login = () => {
  const router = useRouter()
  return (
    <div>
      <button
        type='button'
        onClick={async () => {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
          })
        }}
        className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800'>
        Login with google
      </button>

      <button
        type='button'
        onClick={async () => {
          const { error } = await supabase.auth.signOut()
          router.push('/login')
        }}
        className='py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
        Signout
      </button>
    </div>
  )
}

export default Login
