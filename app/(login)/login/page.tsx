import createClient from '../../../src/supabase/server'
import Login from './Login'

const page = () => {
  const supabase = createClient()

  return (
    <div>
      <Login />
    </div>
  )
}

export default page
