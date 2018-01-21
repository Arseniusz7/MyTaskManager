
export const ProjectForm = ({onNewProject = f=>f}) => {
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
            <input ref={(input) => title = input } type="text" placeholder="Title" required/>
            <input ref={(input) => description = input } type="text" placeholder="Description"/>
            <button>Add project</button>
        </form>
    )
}

