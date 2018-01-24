import {Developer} from './Developer'

export const DeveloperList = ({developers, assignDeveloper=f=>f, projectID=-1}) =>
    (developers._id === projectID) ?
    <div>
        <h1>Search developer result</h1>
        { developers.developers.map((developer) =>
            <Developer key={developer._id} assignDeveloper={(id) => assignDeveloper(projectID, id)} {...developer}/>)
        }
    </div> :
    null