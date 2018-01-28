import TimeAgo from '../TimeAgo'
import {ShowCommentEditContainer} from '../containersProject'

export const CommentBasic = ({_id, text, timestamp, children}) =>
    <div id={_id}>
        <h3>Comment: </h3>
        <p>{text}</p>
        <TimeAgo timestamp={timestamp}/>
        {children}
    </div>

export const Comment = ({userID, _id, author, task, text, timestamp, projectID, onCommentDelete=f=>f, onCommentEdit=f=>f}) => {

    const onDelete = e => {
        e.preventDefault()
        onCommentDelete(_id, author, task, projectID)
    }

    return (
    <CommentBasic _id={_id} text={text} timestamp={timestamp}>
        {
            (userID === author) ?
                <div>
                    <ShowCommentEditContainer _id={_id} text={text} author={author} taskID={task} projectID={projectID} />
                    <a href="#" onClick={onDelete}>Delete</a>
                </div> :
                null
        }
    </CommentBasic>)
}