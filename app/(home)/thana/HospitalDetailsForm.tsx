'use client'
import { useState } from 'react'
import MyModal from '../../../src/components/Dialog'
import VerifyConfirmDialog from '../../../src/components/VerifyConfirmDialog'
import { districts } from '../../../src/models/data/data'
import { IHospital } from '../../../src/models/IHospital'
import { IOption } from '../../../src/models/IOption'
import supabase from '../../../src/supabase/browser'
import ComboBox from './ComboBox'

export default function Page({ hospitals }: { hospitals: IHospital[] }) {
  const [hospital, setHospital] = useState<IHospital>()
  const [selectedDistrict, setSelectedDistrict] = useState<IOption>()
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [showRepsonseDialog, setShowResponseDialog] = useState(false)

  const onChange = (e: any) => {
    hospital && setHospital({ ...hospital, [e.target.name]: e.target.value })
  }

  const updateHospital = async () => {
    setLoading(true)

    let resp = await supabase
      .from('hospital')
      .update({
        ADDRESS: hospital?.ADDRESS,
        MOBILENO: hospital?.MOBILENO,
        MOBILE2: hospital?.MOBILE2,
        ModifiedOn: Date.now(),
      })
      .eq('Id', hospital?.Id)

    if (!resp.error) {
      setShowDialog(false)
      setShowResponseDialog(true)
    } else {
      console.error(resp.error)
    }

    setLoading(false)
  }

  const clearSelection = () => {
    setSelectedDistrict(undefined)
    setHospital(undefined)
  }

  return (
    <>
      <MyModal
        key={hospital?.Id}
        heading='Success!'
        message='Hospital details updated sucecssfully'
        onClose={() => {
          setShowResponseDialog(false)
        }}
        isOpen={showRepsonseDialog}
      />

      <VerifyConfirmDialog
        isOpen={showDialog}
        onConfirm={(input) => {
          if (input == hospital?.THANAREGNO) {
            updateHospital()
          }
        }}
        onClose={() => {
          setShowDialog(false)
        }}
      />

      <form
        className='ml-12 '
        onSubmit={async (e) => {
          e.preventDefault()
          setShowDialog(true)
        }}>
        <div className='mb-6'>
          <label
            htmlFor='hospital_address'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Select district
          </label>
          <ComboBox
            name={'DISTCODE'}
            placeholder={'Select district'}
            options={[...districts]}
            onSelected={(option) => {
              console.log('se', option)
              setSelectedDistrict(option)
            }}
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='hospital_address'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Select hospital
          </label>
          <ComboBox
            name='Id'
            placeholder={'Select hospital'}
            options={hospitals
              .filter((x) => x.DISTCODE == selectedDistrict?.id)
              .map((x) => ({ id: x.Id, name: x.HOSPITALNAME }))}
            onSelected={(hospital) => {
              setHospital(hospitals.find((x) => x.Id == hospital.id))
            }}
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='ADDRESS'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Address of the Hospital
          </label>
          <textarea
            onChange={onChange}
            id='ADDRESS'
            name='ADDRESS'
            value={hospital?.ADDRESS}
            rows={4}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='hospital address'></textarea>
        </div>

        <div className='mb-6'>
          <label
            htmlFor='MOBILENO'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Representative name
          </label>
          <input
            type='text'
            id='REPRESENTATIVE'
            onChange={onChange}
            name='REPRESENTATIVE'
            value={hospital?.REPRESENTATIVE}
            className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='Hospital representative name'
            disabled
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='MOBILENO'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Phone number
          </label>
          <input
            type='tel'
            id='MOBILENO'
            onChange={onChange}
            name='MOBILENO'
            value={hospital?.MOBILENO}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='registered phone number'
            pattern='(\+91)*(\s)*[0-9]{10}'
            required
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='MOBILE2'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Alternate phone number
          </label>
          <input
            type='tel'
            id='MOBILE2'
            onChange={onChange}
            name='MOBILE2'
            value={hospital?.MOBILE2}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='registered phone number'
            pattern='(\+91)*(\s)*[0-9]{10}'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='EMAIL'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
            Email address
          </label>
          <input
            type='email'
            readOnly
            id='EMAIL'
            onChange={onChange}
            name='EMAIL'
            value={hospital?.EMAIL}
            className='bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500'
            placeholder='email'
            required
          />
        </div>

        <div className='flex items-center gap-6'>
          <button
            disabled={loading}
            type='submit'
            className='text-white w-48 border border-green-600 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-300 disabled:text-gray-700'>
            Update details
          </button>
          {/* <button
            type='button'
            onClick={clearSelection}
            className='hover:bg-green-600 text-green-600 border border-green-600 hover:text-white disabled:text-green focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:bg-gray-300 disabled:text-gray-700'>
            Clear
          </button> */}
        </div>
      </form>
    </>
  )
}
