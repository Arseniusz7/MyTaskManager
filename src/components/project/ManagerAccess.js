import {ROLES} from './../../constants'
import {ProjectForm} from './AddProjectForm'
import {SearchForm} from './SearchForm'

export const ManagerAccess = ({user = {role: null}, onNewProject=f=>f}) =>
    (user.role === ROLES.MANAGER) ? [
        <ProjectForm key={0} onNewProject={onNewProject}/>,
        <SearchForm key={1}/>
    ] : null



