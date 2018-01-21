import {Component} from 'react'
import {Project} from './Project'
import {MESSAGES} from './../../constants'


export const ProjectList = ({projects}) =>
    <div>
        <h1>Your Projects:</h1>
        { projects.map((project) =>
            <Project key={project.id} {...project}/>)
        }
    </div>

