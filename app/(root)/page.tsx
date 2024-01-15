import Dashboard from '@/components/general/Dashboard'
import { findUserByClerk } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Page() {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/signup')
  const mongoUser = await findUserByClerk(clerkUser?.id)
  if (!mongoUser) redirect('/onboarding')
  console.log('MONGO USER HERE', mongoUser)
  return (
    <Dashboard />
  )
}
