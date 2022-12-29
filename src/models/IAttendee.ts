export default interface IAttendee {
  id: number
  created_at: Date
  name: string
  event_id: number
  user_id: string
  hospital_name: string
  hospital_address: string
  membership_id: string
  phone_number: string
  email: string
  zone: string
  payment_mode: string
  payment_reference: string
  confirmed: boolean
  code: string
}
