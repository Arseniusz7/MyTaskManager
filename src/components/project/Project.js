import {NewTask} from './containersProject'

export const Project = ({_id, title, description}) =>
    <div id={_id}>
        <h3>{title}</h3>
        <p>{description}</p>
        <NewTask projectID={_id}/>
    </div>