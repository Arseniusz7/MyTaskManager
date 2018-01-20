import PropTypes from 'prop-types'
import { NavLink as Link } from 'react-router-dom'
import '../../stylesheets/Menu.scss'

const selectedStyle = { color: 'red' }

const Menu = ({ sort }) =>
    <nav className="menu">
        <Link to="/app" activeStyle={(sort === '/app') ? selectedStyle : {}}>date</Link>
        <Link to="/app/sort/title" activeStyle={selectedStyle}>title</Link>
        <Link to="/app/sort/rating" activeStyle={selectedStyle}>rating</Link>
    </nav>

Menu.propTypes = {
    sort: PropTypes.string
}

export default Menu
