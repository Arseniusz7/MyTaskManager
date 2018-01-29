import {ShowChangeStatusTaskContainer} from '../containersProject'
import {IsDeveloper} from './Developer'

export const BasicTask = ({_id, title, status, description, developer}) =>
    <div id={_id}>
        <h2>{title}</h2>
        <h4>Status: {status}</h4>
        <IsDeveloper {...developer}/>
        <p>{description}</p>
    </div>


export const Task = ({_id, title, status, description, developer, project, onChangeStatus=f=>f}) =>
    <div>
        <BasicTask _id={_id} title={title} status={status} description={description} developer={developer}/>
        <ShowChangeStatusTaskContainer _id={_id} project={project}/>
    </div>




