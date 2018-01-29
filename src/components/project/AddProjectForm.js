
export const AddProjectForm = ({onNewProject = f=>f}) => {
    let title
    let description

    const submit = (e) => {
        e.preventDefault()
        onNewProject(title.value, description.value)
        title.value = ''
        description.value = ''
    }

    return (
        <form onSubmit={submit}>
            <h3>Create new project</h3>
            <div>
                <input ref={(input) => title = input } type="text" placeholder="Title" required/>
            </div>
            <div>
                <textarea ref={(input) => description = input } type="text" placeholder="Description"/>
            </div>
            <button className="btn btn-primary">Add project</button>
        </form>
    )
}

