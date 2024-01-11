import OnboardingPage from '@/components/shared/OnboardingPage'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

const page = async () => {
    const clerkUser = await currentUser()
    if (!clerkUser) return null
    return (
        <>
            <OnboardingPage clerkId={clerkUser.id} username={clerkUser.username || ''} />
        </>
    )
}

export default page