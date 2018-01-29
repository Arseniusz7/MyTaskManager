
import {Component} from 'react'
import {BackToLogin} from './IsNewAccount'
import {MESSAGES} from './../../constants'
import {toast, ToastContainer} from 'react-toastify'

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
                    <input ref={(input) => email = input} type="email" placeholder="Your Email"/>
                </div>
                <div>
                    <input ref={(input) => password = input} type="password" placeholder="Your Password"/>
                </div>
                <div>
                    <input ref={(input) => firstName = input} type="text" placeholder="Your first name"/>
                </div>
                <div>
                    <input ref={(input) => lastName = input} type="text" placeholder="Your last name"/>
                </div>
                <div>
                    <input className="register_checkbox" ref={(input) => manager = input} type="checkbox" value="true"/>
                    <label htmlFor="manager"> Are you manager?</label>
                </div>
                <button className="btn btn-primary">Register</button>
            </form>
        </div>)
}

export class RegisterFormForRedirect extends Component  {

    static defaultProps = {
        user: { auth: null },
        onRegister: f=>f
    }
    // some toasts will be nice

    render() {
        let {user, onRegister} = this.props
        let register = [<RegisterForm key={0} onRegister={onRegister}/>, <BackToLogin key={1}/>]
        switch (user.auth) {
            case MESSAGES.EMAIL_SENT:
                toast.success("Check your email, please. Confirmation message is sent.", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
                return [...register, <ToastContainer key={register.length}/>]
            case MESSAGES.REGISTER_ERROR:
                toast.error(user.messageDetails, {
                    position: toast.POSITION.BOTTOM_LEFT
                })
                return [...register, <ToastContainer key={register.length}/>]
            default:
                return register
        }
    }
}

export default RegisterForm