export enum endpointsTypes {
  STATIC = 'static',
  DYNAMIC = 'dynamic'
}

interface valuesQuery {
  id: string
  Endpoint_id: string
}

export interface dynamicQuery extends valuesQuery {
  URL: string
}

export type Dictionary<T> = {
  [key: string]: T
}