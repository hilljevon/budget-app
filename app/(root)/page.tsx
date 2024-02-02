import Dashboard from '@/components/general/Dashboard'
import { findUserByClerk } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Page() {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/signup')
  const mongoUser = await findUserByClerk(clerkUser?.id)
  console.log('MY MONGO USER HERE', mongoUser)
  return (
    <Dashboard mongoUser={mongoUser} transactions={mongoUser.transactions} clerkId={clerkUser.id} bills={mongoUser.bills} subscriptions={mongoUser.subscriptions} />
  )
}
