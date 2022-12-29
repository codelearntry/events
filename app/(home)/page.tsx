import UpcomingEvent from '../../src/components/UpcomingEvent'
import createClient from '../../src/supabase/server'

export default async function Events() {
  const supabase = createClient()
  const session = await supabase.auth.getSession()
  console.log(session)

  const { data } = await supabase.from('events.event').select('*')

  return (
    <div className='flex items-center justify-center '>
      {data && <UpcomingEvent event={data[0]} />}
    </div>
  )
}
