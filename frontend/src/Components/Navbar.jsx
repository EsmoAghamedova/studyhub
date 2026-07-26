import { NavLink } from 'react-router';
import { PAGE_PATHS } from '../Configs/Pages';
export function Navbar() {
    const activeLink = '';
    const normalLink = '';
    const linkClass = ({ isActive }) => {
        isActive ? activeLink : normalLink;
    }
    return (
        <nav className='bg-accent-bg'>
            <ol>
                <li>
                    <NavLink to={PAGE_PATHS.register} className={linkClass}>Study hub</NavLink>
                </li>
                <li>
                    <NavLink to={PAGE_PATHS.dashboard} className={linkClass}> Dashboard </NavLink>
                </li>
                <li>
                    <NavLink to={PAGE_PATHS.leaderBoard} className={linkClass}>Leaderboard</NavLink>
                </li>
                <li>
                    <NavLink to={PAGE_PATHS.notes} className={linkClass}>Notes</NavLink>
                </li>
            </ol>
        </nav>
    )
}