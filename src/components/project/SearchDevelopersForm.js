
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
            <input ref={(input) => firstName = input } type="text" placeholder="First Name"/>
            <input ref={(input) => lastName = input } type="text" placeholder="Last Name"/>
            <button>Find</button>
        </form>
    )
}