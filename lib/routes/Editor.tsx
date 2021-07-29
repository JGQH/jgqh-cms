import useAsync from '@Hooks/useAsync'
import useIdentifier from '@Hooks/useIdentifier'
import { getValues } from '@Store'
import { useEffect } from 'react'
import Redirecter from './Redirecter'

interface editorProps<T> {
  Content: (props:T) => JSX.Element
  endpoint: string
}

function DoEditor<T>({ Content, endpoint }: editorProps<T>) {
  const { id } = useIdentifier()

  const { execute, value } = useAsync<T | null>(() => getValues(id || '', endpoint))

  useEffect(() => {
    if(id) {
      execute()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if(value.status === 'idle') return <p>Waiting for fetching to start...</p>
  if(value.status === 'pending') return <p>Loading values...</p>
  if(value.status === 'error') return <p>There&apos;s been an error. ({value.error})</p>
  if(!value.response) return <p>No values were found.</p>

  return <Content {...value.response} />
}

export default function Editor<T>(props: editorProps<T>) {
  return <Redirecter userOnly={true} redirectTo={'/'}>
    <DoEditor<T> {...props} />
  </Redirecter>
}