import IAttendee from '../models/IAttendee'

const AttendeeList = ({ attendees }: { attendees: IAttendee[] }) => {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div className='flex items-center justify-between py-4 bg-white dark:bg-gray-800'>
        <div>
          <span className='pl-6 text-lg'>Attendees</span>
        </div>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fill-rule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clip-rule='evenodd'></path>
            </svg>
          </div>
          <input
            type='text'
            id='table-search-users'
            className='block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search for users'
          />
        </div>
      </div>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Zone
            </th>
            <th scope='col' className='px-6 py-3'>
              Registration status
            </th>
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <tr
              key={attendee.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
              <td
                scope='row'
                className='flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'>
                <div className=''>
                  <div className='text-base font-semibold'>{attendee.name}</div>
                  <div className='font-normal text-gray-500'>
                    {attendee.email}
                  </div>
                </div>
              </td>
              <td className='px-6 py-4'>{attendee.zone}</td>
              <td className='px-6 py-4'>
                {attendee.confirmed ? (
                  <div className='flex items-center'>
                    <div className='h-2.5 w-2.5 rounded-full bg-green-400 mr-2'></div>{' '}
                    Approved
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <div className='h-2.5 w-2.5 rounded-full bg-orange-400 mr-2'></div>{' '}
                    Pending
                  </div>
                )}
              </td>
              <td className='px-6 py-4'>
                <a
                  href='#'
                  type='button'
                  data-modal-toggle='editUserModal'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'>
                  Review attendee
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        id='editUserModal'
        tabIndex={-1}
        aria-hidden='true'
        className='fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full'>
        <div className='relative w-full h-full max-w-2xl md:h-auto'>
          <form
            action='#'
            className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div className='flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Review attendee
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='editUserModal'>
                <svg
                  className='w-5 h-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fill-rule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clip-rule='evenodd'></path>
                </svg>
              </button>
            </div>
            <div className='p-6 space-y-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='first-name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    First Name
                  </label>
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Bonnie'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='email'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='example@company.com'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='phone-number'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Phone Number
                  </label>
                  <input
                    type='number'
                    name='phone-number'
                    id='phone-number'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='e.g. +(12)3456 789'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Hospital
                  </label>
                  <input
                    type='text'
                    name='hospital'
                    id='hospital'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='123456'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Member id
                  </label>
                  <input
                    type='text'
                    name='hospital'
                    id='hospital'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='123456'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Zone
                  </label>
                  <input
                    type='text'
                    name='hospital'
                    id='hospital'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='123456'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Payment mode
                  </label>
                  <input
                    type='text'
                    name='hospital'
                    id='hospital'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='123456'
                  />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label
                    htmlFor='company'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Payment reference
                  </label>
                  <input
                    type='text'
                    name='hospital'
                    id='hospital'
                    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='123456'
                  />
                </div>
              </div>
            </div>
            <div className='flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Confirm registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AttendeeList
