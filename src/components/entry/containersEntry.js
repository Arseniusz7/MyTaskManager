/**
 * project colors
 */
import { connect } from 'react-redux'
import {RegisterFormForRedirect} from './RegisterForm'
import {register} from './../../actions'

export const Register = connect(
    ({user}, {history}) => ({ user, history }),
    dispatch =>
        ({
            onRegister(email, password, firstName, lastName, manager) {
                dispatch(register(email, password, firstName, lastName, manager))
            }
        })
)(RegisterFormForRedirect)
