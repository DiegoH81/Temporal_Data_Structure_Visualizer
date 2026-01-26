import { NavLink } from 'react-router-dom';
import '../components_styles/NavBar.css'

function NavBar()
{
  return (
    <nav className = 'nav-card'>
        <h2>Data Structure Visualizer</h2>

        <div className='nav-links'>
            <NavLink className = {({ isActive }) =>  isActive? 'nav-link-card is-selected' : 'nav-link-card'} to={'/menu'}>
                Menu
            </NavLink>
            <NavLink className = {({ isActive }) =>  isActive? 'nav-link-card is-selected' : 'nav-link-card'} to={'/about'}>
                About us
            </NavLink>
        </div>
    </nav>
  );
}

export default NavBar;