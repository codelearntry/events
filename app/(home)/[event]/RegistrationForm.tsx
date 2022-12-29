'use client'

import { User } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import Dialog from '../../../src/components/Dialog'
import IAttendee from '../../../src/models/IAttendee'
import IEvent from '../../../src/models/IEvent'
import supabase from '../../../src/supabase/browser'

const RegistrationForm = ({
  event,
  attendee,
}: {
  event: IEvent
  attendee?: IAttendee
}) => {
  const [user, setUser] = useState<User>()
  useEffect(() => {
    supabase.auth.getSession().then((x) => {
      let userD = x.data.session?.user
      setUser(userD)

      if (!attendeeState) {
        setAttendeeState({
          code: '',
          created_at: new Date(),
          email: userD?.email,
          hospital_address: '',
          confirmed: false,
          event_id: event.id,
          membership_id: '',
          user_id: userD?.id,
          hospital_name: '',
          id: 0,
          name: userD?.user_metadata.full_name,
          payment_mode: '',
          payment_reference: '',
          phone_number: '',
          zone: '',
        } as IAttendee)
      }
    })
  }, [])

  const [attendeeState, setAttendeeState] = useState<IAttendee | undefined>(
    attendee
  )

  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const onChange = (e: any) => {
    if (attendeeState)
      setAttendeeState({ ...attendeeState, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Dialog
        isOpen={showDialog}
        onClose={() => {
          setShowDialog(false)
        }}
      />
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setLoading(true)

          let post: Omit<IAttendee, 'id'> = {
            code: attendeeState!.code,
            confirmed: attendeeState!.confirmed,
            created_at: attendeeState!.created_at,
            email: attendeeState!.email,
            event_id: attendeeState!.event_id,
            hospital_address: attendeeState!.hospital_address,
            hospital_name: attendeeState!.hospital_name,
            membership_id: attendeeState!.membership_id,
            name: attendeeState!.name,
            payment_mode: attendeeState!.payment_mode,
            payment_reference: attendeeState!.payment_reference,
            phone_number: attendeeState!.phone_number,
            user_id: attendeeState!.user_id,
            zone: attendeeState!.zone,
          }

          let resp = await supabase.from('events.attendee').insert([post])
          setShowDialog(true)
          setLoading(false)
        }}>
        <div className='mb-6'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Name of the delegate
          </label>
          <input
            type='text'
            id='name'
            onChange={onChange}
            name='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='Name'
            value={attendeeState?.name}
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='hospital_name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Name of the Hospital
          </label>
          <input
            type='text'
            onChange={onChange}
            id='hospital_name'
            name='hospital_name'
            value={attendeeState?.hospital_name}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='hospital name'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='hospital_address'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Address of the Hospital
          </label>
          <textarea
            onChange={onChange}
            id='hospital_address'
            name='hospital_address'
            value={attendeeState?.hospital_address}
            rows={4}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='hospital address'></textarea>
        </div>
        <div className='mb-6'>
          <label
            htmlFor='membership_id'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            THANA membership number
          </label>
          <input
            type='text'
            onChange={onChange}
            id='membership_id'
            name='membership_id'
            value={attendeeState?.membership_id}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='THANA membership number'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='phoneNumber'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Phone number
          </label>
          <input
            type='tel'
            id='phone_number'
            onChange={onChange}
            name='phone_number'
            value={attendeeState?.phone_number}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='12345-67890'
            //   pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Email address
          </label>
          <input
            type='email'
            readOnly
            disabled
            id='email'
            onChange={onChange}
            name='email'
            value={attendeeState?.email}
            className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='doctor@gmail.com'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='zone'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Zone
          </label>

          <div className='inline-flex '>
            <div className='flex items-center mr-4'>
              <input
                id='zone1'
                type='radio'
                value=''
                name='zone'
                className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='zone1'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Zone 1
              </label>
            </div>
            <div className='flex items-center mr-4'>
              <input
                id='zone2'
                type='radio'
                value=''
                name='zone'
                className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='zone2'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Zone 2
              </label>
            </div>
            <div className='flex items-center mr-4'>
              <input
                id='zone3'
                type='radio'
                value=''
                name='zone'
                className='w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='zone3'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Zone 3
              </label>
            </div>
          </div>
        </div>
        <div className='mb-6'>
          <label
            htmlFor='company'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Payment details
          </label>
          <div className='flex'>
            <label
              htmlFor='payment_mode'
              className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
              Reference number
            </label>
            <button
              id='payment_mode'
              data-dropdown-toggle='dropdown'
              className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center  bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-green-800'
              type='button'>
              Payment mode
              <svg
                aria-hidden='true'
                className='w-4 h-4 ml-1'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                  clipRule='evenodd'></path>
              </svg>
            </button>
            <div
              id='dropdown'
              className='z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700'>
              <ul
                className='py-1 text-sm text-gray-700 dark:text-gray-200'
                aria-labelledby='dropdown-button'>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white focus:ring-4 '>
                    Cheque
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    DD
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    UPI
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                    OTHERS
                  </a>
                </li>
              </ul>
            </div>
            <div className='relative w-full'>
              <input
                type='text'
                onChange={onChange}
                id='payment_reference'
                name='payment_reference'
                value={attendeeState?.payment_reference}
                className='block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-100 border-l-2 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500'
                placeholder='Payment reference'
                required
              />
            </div>
          </div>
        </div>
        <div className='flex items-start mb-6'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
              type='checkbox'
              value=''
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800'
              required
            />
          </div>
          <label
            htmlFor='remember'
            className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            I agree with the{' '}
            <a
              href='#'
              className='text-green-600 hover:underline dark:text-green-500'>
              terms and conditions
            </a>
            .
          </label>
        </div>
        <div className='flex items-center gap-6'>
          <button
            disabled={loading}
            type='submit'
            className='text-white w-48 border border-green-600 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
            Register
          </button>

          <button
            type='button'
            className='hover:bg-green-600 text-green-600 border border-green-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'>
            Clear
          </button>
        </div>
      </form>
    </>
  )
}

export default RegistrationForm
