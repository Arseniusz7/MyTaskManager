import { DevelopersTask, ShowFindDevContainer, ShowAddCommentContainer} from './../containersProject'
import {Task} from './Task'
import {NavLink} from 'react-router-dom'
import {ROLES, URLS} from './../../constants'
import {Comments} from '../containersProject'

export const TaskDetails = ({user, task, match, onReply=f=>f}) =>
    <div>
        <NavLink to={URLS.APP}>Go back to projects</NavLink>
        <div>
            <NavLink to={`${URLS.APP_TASKS}/${task.project}`}>Go back to tasks</NavLink>
        </div>
        {
            user.role === ROLES.MANAGER ?
                <div>
                    <NavLink to={`${URLS.APP_MANAGER_TASKS}/${task.project}`}>Go to task manager panel</NavLink>
                    <Task {...task}/>
                    <div>
                        <ShowFindDevContainer _id={task._id}/>
                        <DevelopersTask taskID={task._id} projectID={task.project}/>
                        <ShowAddCommentContainer userID={user.id} taskID={task._id} projectID={task.project} onReply={onReply}/>
                    </div>
                    <Comments match={match} userID={user.id}/>
                </div> :
                <div>
                    <Task {...task}/>
                    <div>
                        <ShowAddCommentContainer userID={user.id} taskID={task._id} projectID={task.project} onReply={onReply}/>
                    </div>
                    <Comments match={match} userID={user.id}/>
                </div>
        }
    </div>



