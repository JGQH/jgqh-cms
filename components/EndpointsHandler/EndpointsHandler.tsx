import { useAuth } from '@Auth'
import Router from 'next/router'
import useAsync from '@Hooks/useAsync'
import JButton from '@Components/JButton'
import { endpointsDict, endpointsData, deleteValues } from '@Store'
import styles from './endpointsHandler.module.scss'
import type { endpointsTypes } from '@Types'

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
  const [ execute, value ] = useAsync(async () => await deleteValues(data.id))
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
      execute()
    }
  }

  return (
    <div className={styles.listItem}>
      <div className={styles.itemText}>
        <p>- {data.Name} (Wait: {data.Wait}s)</p>
      </div>
      {user &&
      <>
        <div className={styles.itemEdit}>
          <JButton onClick={editData} disabled={value.status === 'pending' || value.status === 'success'}>Edit</JButton>
        </div>
        <div className={styles.itemEdit}>
          <JButton onClick={deleteData}  disabled={value.status === 'pending' || value.status === 'success'}>Delete</JButton>
        </div>
        <div className={styles.itemText}>
          {value.status === 'pending' && <i>Proceeding with deletion...</i>}
          {value.status === 'error' && <i>Error: {value.error}</i>}
          {value.status === 'success' && <i>Endpoint deleted succesfully. Click &apos;Reload&apos; to update list.</i>}
        </div>
      </>}
    </div>)
}