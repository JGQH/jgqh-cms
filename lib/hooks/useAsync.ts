import { useCallback, useReducer } from 'react';

type asyncInterface<T> =
  | {status: 'idle'}
  | {status: 'pending'}
  | {status: 'success', response: T}
  | {status: 'error', error: string}

export default function useAsync<T>(asyncFunction:() => Promise<T>) {
  type asyncType = asyncInterface<T>

  function Reducer(_:asyncType, a:asyncType):asyncType {
    return a
  }

  const [value, dispatch] = useReducer(Reducer, {status: 'idle'})

  const execute = useCallback(() => {
    dispatch({ status: 'pending' })

    const dispatcher = async () => {
      try {
        const response = await asyncFunction()
        
        dispatch({ status: 'success', response })
      } catch (e) {
        const error = (e as Error).message

        dispatch({ status: 'error', error })
      }
    }

    dispatcher()
  }, [asyncFunction])

  return { execute, value }
}