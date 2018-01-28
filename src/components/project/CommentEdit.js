export const CommentEdit = ({ text, _id, author, taskID, projectID, onEdit=f=>f}) => {
    let editText

    const submit = (e) => {
        e.preventDefault()
        onEdit(editText.value, _id, author, taskID, projectID)
    }

    return (
        <form onSubmit={submit}>
            <input ref={(input) => editText = input } defaultValue={text} type="text" placeholder="Edit comment here"/>
            <button>Edit</button>
        </form>
    )
}