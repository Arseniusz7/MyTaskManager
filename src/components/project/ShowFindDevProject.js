import {SearchDevelopers} from '../containersProject'

export const ShowFindDev = ({show_id, _id, isFindDevProject= f=>f}) => {

    const showFindDevProject = e => {
        e.preventDefault()
        isFindDevProject(_id)
    }

    const hideFindDevProject = e => {
        e.preventDefault()
        isFindDevProject("-1")
    }

    return (show_id.findDev === _id) ?
        <div>
            <a href="#" onClick={hideFindDevProject}>Cancel</a>
            <SearchDevelopers id={_id}/>
        </div> :
        <div>
            <a href="#" onClick={showFindDevProject}>Search developers</a>
        </div>
}