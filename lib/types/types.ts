export enum endpointsTypes {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
  JSON = 'json',
  IMAGES = 'images'
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

export type imageQuery = valuesQuery

export interface Dictionary {
  [key: string]: string
}