import { SignUp } from '@clerk/nextjs'
import { headers } from 'next/headers'

export default async function Page() {
  await headers();
  return <SignUp />
}
