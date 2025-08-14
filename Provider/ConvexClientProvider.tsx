'use client'

import LoadingLogo from '@/components/shared/LoadingLogo'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { Authenticated, AuthLoading, ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import React from 'react'

type Props = {
    children: React.ReactNode ;
}

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL || ''

const convex = new ConvexReactClient(CONVEX_URL)

const ConvexProviderClient = ({children}: Props) => {
  return (
    <ClerkProvider>

        <ConvexProviderWithClerk  client={convex} useAuth={useAuth}>
           
            <Authenticated>
               {children}
            </Authenticated>
            <AuthLoading>
              <LoadingLogo  />
            </AuthLoading>

        </ConvexProviderWithClerk>

    </ClerkProvider>
  )
}

export default ConvexProviderClient