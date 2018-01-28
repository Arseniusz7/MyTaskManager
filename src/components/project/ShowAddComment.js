import {AddComment} from './AddComment'

export const ShowAddComment = ({show_id, userID, taskID, projectID, onReply=f=>f, isAddComment=f=>f}) => {

    const showAddComment = e => {
        e.preventDefault()
        isAddComment(taskID)
    }

    const hideAddComment = e => {
        e.preventDefault()
        isAddComment("-1")
    }

    return (show_id.replyComment === taskID) ?
        <div>
            <a href="#" onClick={hideAddComment}>Cancel</a>
            <AddComment userID={userID} taskID={taskID} projectID={projectID} onReply={onReply}/>
        </div> :
        <div>
            <a href="#" onClick={showAddComment}>Reply</a>
        </div>
}