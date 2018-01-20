/**
 * project colors
 */
import {Component} from 'react'
import {MESSAGES} from './../../constants'

const RegisterForm = ({onRegister=f=>f}) => {
    let email
    let password
    let firstName
    let lastName
    let manager

    const submit = (e) => {
        e.preventDefault()
        onRegister(email.value, password.value, firstName.value, lastName.value, manager.checked)
        email.value = ''
        password.value = ''
        firstName.value = ''
        lastName.value = ''
        manager.checked = false
    }

    return (
        <div>
            <h4>Register your account</h4>
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input ref={(input) => email = input} type="email" placeholder="Your Email"/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input ref={(input) => password = input} type="password" placeholder="Your Password"/>
                </div>
                <div>
                    <label htmlFor="firstName">First name</label>
                    <input ref={(input) => firstName = input} type="text" placeholder="Your first name"/>
                </div>
                <div>
                    <label htmlFor="lastName">Last name</label>
                    <input ref={(input) => lastName = input} type="text" placeholder="Your last name"/>
                </div>
                <div>
                    <input ref={(input) => manager = input} type="checkbox" value="true"/>
                    <label htmlFor="manager">Are you manager?</label>
                </div>
                <button>Register</button>
            </form>
        </div>)
}

export class RegisterFormForRedirect extends Component  {

    static defaultProps = {
        user: { auth: null },
        onRegister: f=>f
    }

    componentDidUpdate() {
        let {user, history} = this.props
        if(user.auth === MESSAGES.SUCCESS)
            history.push('/app')
    }

    render() {
        let {user, onRegister} = this.props
        if(user.auth === MESSAGES.REGISTER_ERROR) {
            console.log(MESSAGES.REGISTER_ERROR)
            return <RegisterForm onRegister={onRegister}/>
        } else {
            return <RegisterForm onRegister={onRegister}/>
        }
    }
}

export default RegisterForm