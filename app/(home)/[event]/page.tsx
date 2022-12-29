import createClient from '../../../src/supabase/server'
import RegistrationForm from './RegistrationForm'

export default async function Event({
  params,
  searchParams,
}: {
  params: { event: number }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()
  let resp = await supabase
    .from('events.event')
    .select('*')
    .eq('id', params.event)

  console.log(resp)

  return (
    <div>
      <RegistrationForm attendee={resp.data![0]} />
    </div>
  )
}
