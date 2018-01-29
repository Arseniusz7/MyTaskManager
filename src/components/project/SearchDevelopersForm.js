
export const SearchDevelopersForm = ({id, onFind=f=>f}) => {
    let firstName
    let lastName

    const submit = (e) => {
        e.preventDefault()
        onFind(firstName.value, lastName.value, id)
        firstName.value = ''
        lastName.value = ''
    }

    return (
        <form onSubmit={submit}>
            <h3>Find developer</h3>
            <div>
                <input ref={(input) => firstName = input } type="text" placeholder="First Name"/>
            </div>
            <div>
                <input ref={(input) => lastName = input } type="text" placeholder="Last Name"/>
            </div>
            <button className="btn btn-primary">Find</button>
        </form>
    )
}