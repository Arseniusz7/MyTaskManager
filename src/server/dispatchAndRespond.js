import {htmlResponse} from './htmlResponse'

const dispatchAndRespond = (req, res, action, server) => {
    if(server) {
        req.store.dispatch(action)
        res.status(200).send(htmlResponse(req))
    }
    else
        res.status(200).json(action)
}

export const dispatchOrRespond = (req, res, action, server, serverRespond) => {
    if(server) {
        req.store.dispatch(action)
        if(serverRespond)
            res.status(200).send(htmlResponse(req))
    }
    else
        res.status(200).json(action)
}


export default dispatchAndRespond