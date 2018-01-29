export const AddComment = ({userID, taskID, projectID, onReply=f=>f}) => {
    let text

    const submit = (e) => {
        e.preventDefault()
        onReply(text.value, userID, taskID, projectID)
        text.value = ''
    }

    return (
        <form onSubmit={submit}>
            <div>
                <textarea ref={(input) => text = input } type="text" placeholder="Leave comment here"/>
            </div>
            <button className="btn btn-primary">Reply</button>
        </form>
    )

}