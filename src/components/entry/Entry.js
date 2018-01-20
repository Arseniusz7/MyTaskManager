/**
 * project colors
 */
import {Login} from './containersEntry'
import { NavLink as Link } from 'react-router-dom'

const Entry = () =>
    <div>
        <Login/>
        <Link to="/register">Would you like create an account?</Link>
    </div>

export default Entry;