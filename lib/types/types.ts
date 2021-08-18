export enum endpointsTypes {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
  JSON = 'json'
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

export interface jsonQuery extends valuesQuery {
  Value: Dictionary
}

export interface Dictionary {
  [key: string]: string
}