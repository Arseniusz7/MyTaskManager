import {ROLES} from './../../constants'
import {ProjectForm} from './AddProjectForm'
import {ManagerProject} from './Project'
import {Developers, SearchDevelopers} from '../containersProject'

export const ManagerProjects =({projects}) =>
    <div>
        <h1>Your Projects:</h1>
        { projects.map((project) =>
            <div>
                <ManagerProject key={project._id} project={project}/>
                <SearchDevelopers key={project._id} id={project._id}/>
                <Developers key={project._id} projectID={project._id}/>
            </div>
        )
        }
    </div>


export const ManagerAccess = ({user={role: null}, projects, onNewProject=f=>f}) =>
    (user.role === ROLES.MANAGER) ? [
        <ProjectForm key={0} onNewProject={onNewProject}/>,
        <ManagerProjects key={1} projects={projects}/>
    ] : null


