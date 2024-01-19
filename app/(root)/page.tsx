import Dashboard from '@/components/general/Dashboard'
import { findUserByClerk } from '@/lib/actions/user.actions'
import { handleBankData1 } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default async function Page() {
  const clerkUser = await currentUser()
  if (!clerkUser) redirect('/signup')
  const mongoUser = await findUserByClerk(clerkUser?.id)
  // if (!mongoUser) redirect('/onboarding')
  const recentDate = mongoUser.transactions[0].Date
  const averages = handleBankData1(mongoUser.transactions)

  return (
    <Dashboard testArrays={averages} recentDate={recentDate} />
  )
}
