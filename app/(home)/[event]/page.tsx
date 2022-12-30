import IEvent from '../../../src/models/IEvent'
import createClient from '../../../src/supabase/server'
import RegistrationForm from './RegistrationForm'

export const revalidate = 0

export default async function Event({
  params,
  searchParams,
}: {
  params: { event: number }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('events.event')
    .select('*')
    .eq('id', params.event)

  const currentUser = await (
    await supabase.auth.getSession()
  ).data.session?.user

  const { data: attendee, error: attendeeError } = await supabase
    .from('events.attendee')
    .select('*')
    .eq('event_id', params.event)
    .eq('user_id', currentUser?.id)
    .maybeSingle()

  const event: IEvent = (data?.length ?? 0) > 0 && data![0]

  return event ? (
    <div className='flex flex-col max-w-2xl gap-6 mx-auto'>
      <section className='mb-4'>
        <span className='text-2xl text-green-800'>
          Register for {event.name} event here.
        </span>
      </section>
      {attendee && attendee.confirmed && (
        <div
          id='alert-additional-content-3'
          className='p-4 mb-4 border border-green-300 rounded-lg bg-green-50 dark:bg-green-200'
          role='alert'>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-5 h-5 mr-2 text-green-700 dark:text-green-800'>
              <path
                fill-rule='evenodd'
                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                clip-rule='evenodd'
              />
            </svg>

            <span className='sr-only'>Info</span>
            <h3 className='text-lg font-medium text-green-700 dark:text-green-800'>
              Congratulations, your registration is confirmed!
            </h3>
          </div>
          <div className='mt-2 mb-4 text-sm text-green-700 dark:text-green-800'>
            Your registration code is{' '}
            <code>
              {attendee.code ?? `${event.attended_code_prefix}${attendee.id}`}
            </code>
            . You can download the badge here.
          </div>
          <div className='flex'>
            <button
              type='button'
              className='text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-green-800 dark:hover:bg-green-900'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke-width='1.5'
                stroke='currentColor'
                className='-ml-0.5 mr-2 h-4 w-4'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                />
              </svg>
              Download
            </button>
          </div>
        </div>
      )}

      {attendee && !attendee.confirmed && (
        <div
          className='flex p-4 mb-4 text-sm text-yellow-400 bg-gray-700 rounded-lg dark:bg-blue-200 dark:text-blue-800'
          role='alert'>
          <svg
            aria-hidden='true'
            className='flex-shrink-0 inline w-5 h-5 mr-3'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fill-rule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
              clip-rule='evenodd'></path>
          </svg>
          <span className='sr-only'>Info</span>
          <div>
            <span className='font-medium'>
              Your registrations is still under review by our team.
            </span>{' '}
            Please check after some time for update.
          </div>
        </div>
      )}

      <RegistrationForm event={event} attendee={attendee} />
    </div>
  ) : (
    <span>No events.</span>
  )
}
