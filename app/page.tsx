import createClient from '../src/supabase/server'

export default async function Home() {
  const supabase = createClient()
  const { data } = await supabase.from('events.event').select('*')

  return <div className=''>{data || ''}</div>
}
