
import {Component} from 'react'
import {MESSAGES, URLS} from './../../constants'
import {IsNewAccount} from './IsNewAccount'
import {toast, ToastContainer} from 'react-toastify'

export const LoginForm = ({onLogin=f=>f}) => {
    let email
    let password

    const submit = e => {
        e.preventDefault()
        onLogin(email.value, password.value)
        email.value = ''
        password.value = ''
    }

    return (
        <div>
            <h4>Log in</h4>
            <form onSubmit={submit}>
                <div>
                    <input ref={(input) => email = input} type="email" name="email" placeholder="Your Email"/>
                </div>
                <div>
                    <input ref={(input) => password = input} type="password" name="password" placeholder="Your Password"/>
                </div>
                <button className="btn btn-primary">Log in</button>
            </form>
        </div>)

}

export class LoginFormForRedirect extends Component  {

    static defaultProps = {
        user: { auth: null },
        onLogin: f=>f
    }

    componentDidUpdate() {
        let {user, history} = this.props
        if(user.auth === MESSAGES.SUCCESS)
            history.push(URLS.APP)
    }

    // some toasts will be nice

    render() {
        let {user, onLogin} = this.props
        let login = [<LoginForm key={0} onLogin={onLogin}/>, <IsNewAccount key={1}/>]
        if(user.auth === MESSAGES.LOGIN_ERROR) {
            toast.error(user.messageDetails, {
                position: toast.POSITION.BOTTOM_LEFT
            })
            return [...login, <ToastContainer key={login.length}/>]
        } else {
            return login
        }
    }
}

export default LoginForm