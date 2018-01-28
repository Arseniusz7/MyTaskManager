import {Component} from 'react'
import {CommentContainer} from '../containersProject'

export class CommentList extends Component {

    componentDidMount () {
        let {comments, loadComments, match} = this.props
        if(!(comments && comments.length !== 0))
            loadComments(match.params.id, match.params.task_id)
    }

    render () {
        let {comments, match, userID} = this.props
        if(comments)
            return (
                <div>
                    {comments.map(comment =>
                        <CommentContainer key={comment._id} userID={userID} projectID={match.params.id} {...comment}/>)}
                </div>)
        else
            return null

    }
}

