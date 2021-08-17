import Supabase from './Supabase'
import type { endpointsTypes } from '@Types'

//Get main list of endpoints
export type endpointsData = {
  id: string
  Name: string
  Wait: number
}

export type endpointsDict = {
  [key in endpointsTypes]?: endpointsData[]
}

export async function getEndpoints() {
  type endpointsQuery = endpointsData & {
    Endpoint: endpointsTypes
  }

  const { data, error, status } = await Supabase.from<endpointsQuery>('Endpoints').select('id, Endpoint, Name, Wait')

  if(error && status !== 406) throw error

  const Endpoints:endpointsDict = {}

  if(data) {
    data.forEach(epq => {
      const Endpoint = Endpoints[epq.Endpoint] || []

      Endpoint.push({
        id: epq.id,
        Name: epq.Name,
        Wait: epq.Wait
      })

      Endpoints[epq.Endpoint] = Endpoint
    })
  }

  return Endpoints
}

//Get value of specified endpoint
export async function getValues<T>(id:string, endpoint:string) {
  const { data, error, status } = await Supabase.from(endpoint).select().match({ 'Endpoint_id': id })

  if(error && status !== 406) throw error

  return data && data[0] as T
}

//Update values of specified endpoint
export async function setValues<T>(id:string, endpoint:string, values:Partial<T>) {
  const { error, status } = await Supabase.from<T>(endpoint).update(values, { returning: 'minimal' }).match({ 'id': id })

  if(error && status !== 406) throw error
}

//Create new endpoint with default values
export async function createValues(endpoint:endpointsTypes, name:string, wait:number) {
  if(name.length < 4) throw new Error('\'Name\' field is too short')
  if(isNaN(wait)) throw new Error('Invalid \'wait\' value')

  const { error } = await Supabase.rpc<void>('create_endpoint', { 
    'endpoint_type': endpoint,
    'endpoint_name': name,
    'endpoint_wait': wait
  })

  if(error) throw error
}

//Delete specified endpoints and related values
export async function deleteValues(id:string) {
  const { error } = await Supabase.rpc<void>('delete_endpoint', {
    'endpoint_id': id
  })

  if(error) throw error
}