export default interface IEvent {
  id: number
  created_at: Date
  name: string
  start_date: Date
  end_date: Date
  location: string
  website?: any
  capacity: number
  entry_fee: number
  created_by?: any
  active: boolean
  attended_code_prefix: string
}
