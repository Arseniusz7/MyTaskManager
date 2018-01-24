import {URLS} from './../../constants'
import {NavLink} from 'react-router-dom'



export const ProjectDetails = ({_id, title, description, children}) =>
    <div id={_id}>
        <h2>{title}</h2>
        <p>{description}</p>
        { children }
    </div>

export const Project = ({project}) =>
    <ProjectDetails {...project}>
        <NavLink to={`${URLS.APP_TASKS}/${project._id}`}>Go to tasks</NavLink>
    </ProjectDetails>

export const ManagerProject = ({project}) =>
    <ProjectDetails {...project}>
        <NavLink to={`${URLS.APP_MANAGER_TASKS}/${project._id}`}>Go to tasks</NavLink>
    </ProjectDetails>
