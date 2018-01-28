import {htmlResponse} from './htmlResponse'

const dispatchAndRespond = (res, action, server) => {
    if(server) {
        server.store.dispatch(action)
        res.status(200).send(htmlResponse(server))
    }
    else
        res.status(200).json(action)
}


export default dispatchAndRespond