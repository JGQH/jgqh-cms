import type { endpointsDict, endpointsData } from '@Store'
import { endpointsTypes } from '@Types'

interface endpointsHandlerProps {
  response: endpointsDict
}

export default function EndpointsHandler({ response }: endpointsHandlerProps) {
  const Endpoints = Object.keys(response) as endpointsTypes[]

  return (
    <div>
      {Endpoints.map((endpoint, index) => {
        const dataList = response[endpoint] || []

        return <EndpointInfo key={index} {...{endpoint, dataList}} />
      })}
    </div>
  )
}

interface endpointVisualizerProps extends JSX.IntrinsicAttributes {
  endpoint: endpointsTypes
  dataList: endpointsData[]
}
function EndpointInfo({ endpoint, dataList }: endpointVisualizerProps) {
  return (
    <div>
      <div>
        {endpoint}
      </div>
      <div>
        {dataList.map((data, index) => {
          return <EndpointContent key={index} {...{data}} />
        })}
      </div>
    </div>)
}

interface endpointContentProps extends JSX.IntrinsicAttributes {
  data: endpointsData
}
function EndpointContent({ data }: endpointContentProps) {

  function editData() {
    console.log(data.id)
  }

  return (
    <div>
      <div>
        <p>-{data.Name} (Wait: {data.Wait}ms)</p>
      </div>
      <div>
        <button onClick={editData}>Edit</button>
      </div>
    </div>)
}