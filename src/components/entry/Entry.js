/**
 * project colors
 */
import {LoginForm} from './LoginForm'
import { NavLink as Link } from 'react-router-dom'

const Entry = () =>
    <div>
        <LoginForm/>
        <Link to="/register">Would you like create an account?</Link>
    </div>

export default Entry;