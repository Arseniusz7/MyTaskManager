export const Task = ({_id, title, status, description}) =>
    <div id={_id}>
        <h2>{title}</h2>
        <h3>{status}</h3>
        <p>{description}</p>
    </div>