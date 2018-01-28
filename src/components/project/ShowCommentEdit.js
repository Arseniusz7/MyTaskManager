import {CommentEdit} from './CommentEdit'

export const ShowCommentEdit = ({text, _id, author, taskID, projectID, show_id, isEditComment=f=>f, onCommentEdit=f=>f}) => {

    const showEditComment = e => {
        e.preventDefault()
        isEditComment(_id)
    }

    const hideEditComment = e => {
        e.preventDefault()
        isEditComment("-1")
    }

    return (show_id.editComment === _id) ?
        <div>
            <a href="#" onClick={hideEditComment}>Close edition</a>
            <CommentEdit _id={_id} text={text} author={author} taskID={taskID} projectID={projectID} onEdit={onCommentEdit}/>
        </div> :
        <div>
            <a href="#" onClick={showEditComment}>Edit</a>
        </div>
}
