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
                <input ref={(input) => text = input } type="text" placeholder="Leave comment here"/>
            </div>
            <button>Reply</button>
        </form>
    )

}