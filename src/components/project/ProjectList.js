import {Component} from 'react'
import {Project} from './Project'


export const ProjectList = ({projects}) =>
    <div>
        <h1>Your Projects:</h1>
        { projects.map((project) =>
            <Project key={project._id} project={project}/>)
        }
    </div>

export class ProjectListLoad extends Component {
    componentDidMount () {
        let {projects, loadProjects} = this.props
        if(!(projects && projects.length !== 0))
            loadProjects()
    }

    render() {
        return <ProjectList projects={this.props.projects}/>
    }
}

