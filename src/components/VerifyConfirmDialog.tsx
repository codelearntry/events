import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

export default function VerifyConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: string) => void
}) {
  const [THANAREGNO, setTHANAREGNO] = useState('')

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'>
                  Confirm hospital registration id to proceed
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    To authorize updating the details, please enter TANA
                    Registration number and click submit.
                  </p>
                </div>

                <div className='mt-6'>
                  <label
                    htmlFor='THANAREGNO'
                    className='block text-sm font-medium text-gray-900 sr-only dark:text-white'>
                    Representative name
                  </label>
                  <input
                    type='text'
                    id='THANAREGNO'
                    onChange={(e) => {
                      setTHANAREGNO(e.target.value)
                    }}
                    name='THANAREGNO'
                    value={THANAREGNO}
                    className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
                    placeholder='THANA Registrtion number'
                  />
                </div>

                <div className='flex items-center gap-6 mt-4'>
                  <button
                    type='button'
                    className='text-white w-48 border border-green-600 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-300 disabled:text-gray-700'
                    onClick={() => {
                      onConfirm(THANAREGNO)
                    }}>
                    Submit
                  </button>

                  <button
                    type='button'
                    className='hover:bg-green-600 text-green-600 border border-green-600 hover:text-white disabled:text-green focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-300 disabled:text-gray-700'
                    onClick={onClose}>
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
