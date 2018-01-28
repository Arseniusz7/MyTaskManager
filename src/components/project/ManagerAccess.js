import {ManagerProject} from './Project'
import {Developers, ShowFindDevContainer, ShowNewProjectContainer} from '../containersProject'

export const ManagerProjects =({projects}) =>
    <div>
        <ShowNewProjectContainer/>
        <h1>Your Projects:</h1>
        { projects.map((project) =>
            <div>
                <ManagerProject key={project._id} project={project}/>
                <ShowFindDevContainer key={project._id} _id={project._id}/>
                <Developers key={project._id} projectID={project._id}/>
            </div>
        )
        }
    </div>



