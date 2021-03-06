/**
 * project colors
 */
import { connect } from 'react-redux'
import {RegisterFormForRedirect} from './entry/RegisterForm'
import {LoginFormForRedirect} from './entry/LoginForm'
import {register, login} from '../actions'

const userStateToProps = ({user}, {history}) => ({ user, history })

export const Register = connect(
    userStateToProps,
    dispatch =>
        ({
            onRegister(email, password, firstName, lastName, manager) {
                dispatch(register(email, password, firstName, lastName, manager))
            }
        })
)(RegisterFormForRedirect)

export const Login = connect(
    userStateToProps,
    dispatch =>
        ({
            onLogin(email, password) {
                dispatch(login(email, password))
            }
        })
)(LoginFormForRedirect)
