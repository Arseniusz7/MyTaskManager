import {Developer} from './Developer'

export const DeveloperList = ({show_id, developers, assignDeveloper=f=>f, projectID}) =>
    (show_id.findDev  === projectID) ?
    <div>
        <h1>Search developer result</h1>
        { developers.map((developer) =>
            <Developer key={developer._id} assignDeveloper={(id) => assignDeveloper(projectID, id)} {...developer}/>)
        }
    </div> :
    null


export const TaskDeveloperList = ({show_id, developers, assignDeveloper=f=>f, taskID, projectID}) =>
    (show_id.findDev === taskID) ?
        <div>
            <h1>Search developer result</h1>
            { developers.map((developer) =>
                <Developer key={developer._id} assignDeveloper={
                    (id) => assignDeveloper(taskID, projectID, id)} {...developer}/>)
            }
        </div> :
        null