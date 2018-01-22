import {NewTask} from './containersProject'
import {NavLink} from 'react-router-dom'

export const Project = ({_id, title, description}) =>
    <div id={_id}>
        <h3>{title}</h3>
        <p>{description}</p>
        <NewTask projectID={_id}/>
        <NavLink to={`/app/tasks/${_id}`}>Go to tasks</NavLink>
    </div>