import { useAuth } from '@Auth'
import JButton from '@Components/JButton'
import type { endpointsTypes } from '@Types'
import type { endpointsDict, endpointsData } from '@Store'
import styles from './endpointsHandler.module.scss'

interface endpointsHandlerProps {
  response: endpointsDict
}

export default function EndpointsHandler({ response }: endpointsHandlerProps) {
  const Endpoints = Object.keys(response) as endpointsTypes[]

  return (
    <>
      {Endpoints.map((endpoint, index) => {
        const dataList = response[endpoint] || []

        return <EndpointInfo key={index} {...{endpoint, dataList}} />
      })}
    </>
  )
}

interface endpointVisualizerProps extends JSX.IntrinsicAttributes {
  endpoint: endpointsTypes
  dataList: endpointsData[]
}
function EndpointInfo({ endpoint, dataList }: endpointVisualizerProps) {
  return (
    <div className={styles.endpointInfo}>
      <div className={styles.infoTitle}>
        <h1>{endpoint}</h1>
      </div>
      <div className={styles.infoList}>
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
  const { user } = useAuth()

  function editData() {
    console.log(data.id)
  }

  return (
    <div className={styles.listItem}>
      <div className={styles.itemTitle}>
        <p>- {data.Name} (Wait: {data.Wait}s)</p>
      </div>
      {user &&
      <div className={styles.itemEdit}>
        <JButton onClick={editData} >Edit</JButton>
      </div>}
    </div>)
}