import {NewProject} from '../containersProject'

export const ShowNewProject = ({show_id, isNewProject=f=>f}) => {

    const showNewProject = e => {
        e.preventDefault()
        isNewProject("1")
    }

    const hideNewProject = e => {
        e.preventDefault()
        isNewProject("-1")
    }

    return (show_id.addProject === "1") ?
        <div>
            <a href="#" onClick={hideNewProject}>Cancel</a>
            <NewProject/>
        </div> :
        <div>
            <a href="#" onClick={showNewProject}>Add project</a>
        </div>
}