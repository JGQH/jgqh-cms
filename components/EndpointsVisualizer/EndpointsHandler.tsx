import { useAuth } from '@Auth'
import JButton from '@Components/JButton'
import type { endpointsTypes } from '@Types'
import { endpointsDict, endpointsData, deleteValues } from '@Store'
import styles from './endpointsHandler.module.scss'
import Router from 'next/router'

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
          return <EndpointContent key={index} {...{data, endpoint}} />
        })}
      </div>
    </div>)
}

interface endpointContentProps extends JSX.IntrinsicAttributes {
  endpoint: endpointsTypes
  data: endpointsData
}
function EndpointContent({ data, endpoint }: endpointContentProps) {
  const { user } = useAuth()

  async function editData() {
    await Router.push({
      pathname: `${endpoint}/[id]`,
      query: { id: data.id }
    })
  }

  async function deleteData() {
    const doDelete = confirm(`Are you sure to delete endpoint '${data.Name}'?`)

    if(doDelete) {
      try {
        await deleteValues(data.id)
        alert(`Endpoint '${data.Name}' successfully deleted. Click the 'Reload' button to reflect changes.`)
      } catch (e) {
        alert((e as Error).message)
      }
    }
  }

  return (
    <div className={styles.listItem}>
      <div className={styles.itemTitle}>
        <p>- {data.Name} (Wait: {data.Wait}s)</p>
      </div>
      {user &&
      <>
        <div className={styles.itemEdit}>
          <JButton onClick={editData} >Edit</JButton>
        </div>
        <div className={styles.itemEdit}>
          <JButton onClick={deleteData}>Delete</JButton>
        </div>
      </>}
    </div>)
}