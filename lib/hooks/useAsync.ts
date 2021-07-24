import { useCallback, useReducer } from 'react';

export enum asyncStatus {
  IDLE,
  PENDING,
  SUCCESS,
  ERROR
}

type asyncInterface<T> =
  | {status: asyncStatus.IDLE}
  | {status: asyncStatus.PENDING}
  | {status: asyncStatus.SUCCESS, response: T}
  | {status: asyncStatus.ERROR, error: string}

export function useAsync<T>(asyncFunction:() => Promise<T>) {
  type asyncType = asyncInterface<T>

  function Reducer(_:asyncType, a:asyncType):asyncType {
    return a
  }

  const [value, dispatch] = useReducer(Reducer, {status: asyncStatus.IDLE})

  const execute = useCallback(() => {
    dispatch({ status: asyncStatus.PENDING })

    const dispatcher = async () => {
      try {
        const response = await asyncFunction()
        
        dispatch({ status: asyncStatus.SUCCESS, response })
      } catch (e) {
        const error = (e as Error).message

        dispatch({ status: asyncStatus.ERROR, error })
      }
    }

    dispatcher()
  }, [asyncFunction])

  return { execute, value }
}