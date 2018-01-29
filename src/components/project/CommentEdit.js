export const CommentEdit = ({ text, _id, author, taskID, projectID, onEdit=f=>f}) => {
    let editText

    const submit = (e) => {
        e.preventDefault()
        onEdit(editText.value, _id, author, taskID, projectID)
    }

    return (
        <form onSubmit={submit}>
            <div>
                <textarea ref={(input) => editText = input } defaultValue={text} type="text" placeholder="Edit comment here"/>
            </div>
            <button className="btn btn-primary">Edit</button>
        </form>
    )
}