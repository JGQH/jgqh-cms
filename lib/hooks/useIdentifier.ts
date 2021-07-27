import { useRouter } from 'next/router';

type queryProps = {
  query: {
    id?:string
  }
}

export default function useIdentifier() {
  const { query: { id } }: queryProps = useRouter()

  return {
    id: id || ''
  }
}