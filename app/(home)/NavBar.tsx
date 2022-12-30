'use client'
import { User } from '@supabase/supabase-js'
import 'flowbite'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import logo from '../../public/THANA_logo.jpg'
import supabase from '../../src/supabase/browser'

const NavBar = () => {
  const router = useRouter()
  const [user, setUser] = useState<User>()
  useEffect(() => {
    supabase.auth.getSession().then((x) => {
      setUser(x.data.session?.user)
    })
  }, [])

  return (
    <nav className=' border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <Link href='/' className='flex items-center'>
          <Image
            className='pr-4'
            width={70}
            height={70}
            alt='THANA logo'
            src={logo}
          />
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
            Events
          </span>
        </Link>
        <section className='flex gap-6'>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto '
            id='mobile-menu-2'>
            <ul className='flex flex-col mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li className='px-2 py-2 rounded-md hover:bg-green-200'>
                <Link
                  href='/'
                  className='block text-white bg-green-700 rounded md:bg-transparent md:text-green-700 md:p-0 dark:text-white'
                  aria-current='page'>
                  Home
                </Link>
              </li>
              <li className='px-2 py-2 rounded-md hover:bg-green-200'>
                <Link
                  href='/'
                  className='block text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                  Events
                </Link>
              </li>

              <li className='px-2 py-2 rounded-md hover:bg-green-200'>
                <Link
                  href='/contact'
                  className='block text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {user ? (
            <div className='flex items-center '>
              <button
                type='button'
                className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-600'
                id='user-menu-button'
                aria-expanded='false'
                data-dropdown-toggle='user-dropdown'
                data-dropdown-placement='bottom'>
                <span className='sr-only'>Open user menu</span>
                <Image
                  width={24}
                  height={24}
                  className='w-8 h-8 rounded-full'
                  src={user.user_metadata.avatar_url}
                  alt={'Profile picture'}
                />
              </button>

              <div
                className='z-50 hidden my-4 text-base list-none divide-y divide-gray-100 rounded shadow bg-gray-50 dark:bg-gray-700 dark:divide-gray-600'
                id='user-dropdown'>
                <div className='px-4 py-3'>
                  <span className='block text-sm text-gray-900 dark:text-white'>
                    {user.user_metadata.full_name}
                  </span>
                  <span className='block text-sm font-medium text-gray-500 truncate dark:text-gray-400'>
                    {user.email}
                  </span>
                </div>
                <ul className='py-1' aria-labelledby='user-menu-button'>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                      Earnings
                    </a>
                  </li>
                  <li>
                    <button
                      type='button'
                      onClick={async () => {
                        const { error } = await supabase.auth.signOut()

                        router.refresh()
                      }}
                      className='flex block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'>
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>

              <button
                data-collapse-toggle='mobile-menu-2'
                type='button'
                className='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-green-600'
                aria-controls='mobile-menu-2'
                aria-expanded='false'>
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'></path>
                </svg>
              </button>
            </div>
          ) : (
            <a
              href='/login'
              className='block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
              Sign in
            </a>
          )}
        </section>
      </div>
    </nav>
  )
}

export default NavBar
