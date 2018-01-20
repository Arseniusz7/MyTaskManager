/**
 * project colors
 */

const dispatchAndRespond = (req, res, action) => {
    req.store.dispatch(action)
    res.status(200).json(action)
}

export default dispatchAndRespond