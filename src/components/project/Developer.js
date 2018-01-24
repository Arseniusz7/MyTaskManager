export const Developer = ({_id, firstName, lastName, username, assignDeveloper=f=>f}) => {

    const onClick = (e) => {
        e.preventDefault()
        assignDeveloper(_id)
    }

    return (
        <div id={_id}>
            <h3>Developer:</h3>
            <p>{`${firstName} ${lastName}`}</p>
            <p>Email:{username}</p>
            <a href="#" onClick={onClick}>Assign developer</a>
        </div>)

}
