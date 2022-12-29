import Link from 'next/link'
import IEvent from '../models/IEvent'

const EventCard = ({ event }: { event: IEvent }) => {
  return (
    <a
      href='#'
      className='flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
      <img
        className='object-fill w-full px-2 '
        src='https://www.gosahin.com/upload/destinations/1528637280_Warangal-Fort1.jpg'
        alt=''
      />
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
          {event.name}
        </h5>
        <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
        <Link
          href={`\\${event.id}`}
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
          Register
          <svg
            aria-hidden='true'
            className='w-4 h-4 ml-2 -mr-1'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'>
            <path
              fill-rule='evenodd'
              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
              clip-rule='evenodd'></path>
          </svg>
        </Link>
      </div>
    </a>
  )
}

export default EventCard
