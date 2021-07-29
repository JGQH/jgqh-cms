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

export interface staticQuery extends valuesQuery {
  URL: string
  Parameters: Dictionary
}

export interface Dictionary {
  [key: string]: string
}