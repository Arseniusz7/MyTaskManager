export const BasicDeveloper = ({_id, firstName, lastName, username, children}) =>
    <div id={_id}>
        <h4>Developer: {`${firstName} ${lastName}`}</h4>
        <p>Email:{username}</p>
        {children}
    </div>

export const Developer = ({_id, firstName, lastName, username, assignDeveloper=f=>f}) => {

    const onClick = (e) => {
        e.preventDefault()
        assignDeveloper({_id, firstName, lastName, username})
    }

    return (
        <BasicDeveloper _id={_id} firstName={firstName} lastName={lastName} username={username}>
            <a className="btn btn-primary" href="#" onClick={onClick}>Assign developer</a>
        </BasicDeveloper>)

}

export const IsDeveloper = (developer) =>
    (developer && developer.username) ?
        <BasicDeveloper {...developer}/> :
        <h4>Developer is missing</h4>
