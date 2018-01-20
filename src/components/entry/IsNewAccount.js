/**
 * project colors
 */
import { NavLink as Link } from 'react-router-dom'
import {URLS} from './../../constants'

export const IsNewAccount = () =>
    <Link to={URLS.REGISTER}>Would you like create an account?</Link>