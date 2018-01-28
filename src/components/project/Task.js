import {ShowChangeStatusTaskContainer} from '../containersProject'

export const BasicTask = ({_id, title, status, description}) =>
    <div id={_id}>
        <h2>{title}</h2>
        <h3>Status: {status}</h3>
        <p>{description}</p>
    </div>


export const Task = ({_id, title, status, description, project, onChangeStatus=f=>f}) =>
    <div>
        <BasicTask _id={_id} title={title} status={status} description={description} />
        <ShowChangeStatusTaskContainer _id={_id} project={project}/>
    </div>




