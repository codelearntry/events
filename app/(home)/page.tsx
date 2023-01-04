import { redirect } from 'next/navigation'

export default async function Events() {
  redirect('/thana')
  // const supabase = createClient()
  // const session = await supabase.auth.getSession()

  // const { data } = await supabase.from('events.event').select('*')

  // return (
  //   <div className='flex flex-col items-center justify-center gap-6 '>
  //     {data && data.map((x, index) => <EventCard key={index} event={x} />)}
  //   </div>
  // )
}
