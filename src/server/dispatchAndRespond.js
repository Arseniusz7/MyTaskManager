import {htmlResponse} from './htmlResponse'

const dispatchAndRespond = (req, res, action, server) => {
    req.store.dispatch(action)
    if(server)
        res.status(200).send(htmlResponse(req))
    else
        res.status(200).json(action)
}

export default dispatchAndRespond