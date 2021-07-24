import Supabase from './Supabase'
import type { endpointsTypes } from '@Types'

//Get main list of endpoints
export interface endpointsData {
  id: string
  Name: string
  Wait: number
}

export type endpointsDict = {
  [key in endpointsTypes]?: endpointsData[]
}

export async function getEndpoints() {
  interface endpointsQuery extends endpointsData{
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