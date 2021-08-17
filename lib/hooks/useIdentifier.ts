import { NextRouter, useRouter } from 'next/router'

type IdentityRouter = NextRouter & {
  query: {
    id?:string
  }
}

export default function useIdentifier() {
  const router:IdentityRouter = useRouter()

  return {
    id: router.query.id
  }
}