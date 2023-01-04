import createClient from '../../../src/supabase/server'
import HospitalDetailsForm from './HospitalDetailsForm'

const HospitalDetails = async () => {
  const supabase = createClient()
  const currentUser = await (
    await supabase.auth.getSession()
  ).data.session?.user

  let { data: hospital, error } = await supabase.from('hospital').select('*')

  return (
    <div className=''>
      {hospital && <HospitalDetailsForm hospitals={hospital} />}
    </div>
  )
}

export default HospitalDetails
