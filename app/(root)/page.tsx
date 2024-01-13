import Dashboard from '@/components/general/Dashboard'
import { currentUser } from '@clerk/nextjs'

export default async function Page() {
  const clerkUser = await currentUser()
  console.log(clerkUser)
  return (
    <Dashboard />
  )
}
