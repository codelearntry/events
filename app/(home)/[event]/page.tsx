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
  const { data, error } = await supabase
    .from('events.event')
    .select('*')
    .eq('id', params.event)

  const { data: attendees, error: attendeeError } = await supabase
    .from('events.attendee')
    .select('*')
    .eq('event_id', params.event)

  const event = (data?.length ?? 0) > 0 && data![0]

  return event ? (
    <div className='max-w-2xl mx-auto'>
      <section className='mb-4'>
        <span className='text-2xl text-green-800'>
          Register for {event.name} event here.
        </span>
      </section>
      <RegistrationForm event={event} />
    </div>
  ) : (
    <span>No events.</span>
  )
}
