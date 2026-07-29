import { NavLink } from 'react-router';
import { PAGE_PATHS } from '../Configs/Pages';

export function Navbar() {
    const activeLink = `font-light text-md px-2 rounded
    inline-flex items-center justify-center
    sm:text-2xl sm:px-4 sm:rounded-tr-md sm:rounded-br-md
    bg-primary-bg outline outline-accent-bg text-primary-fg`;

    const normalLink = `text-xs rounded
    sm:text-xl sm:px-4 inline-flex items-center justify-center
    px-2 py-1 text-surface-muted-fg
    hover:bg-primary-bg hover:text-primary-fg hover:outline outline-surface-muted-fg
    hover:text-md`;
    // this one is applied to the rest links excluding the one user is on

    const linkClass = ({ isActive }) => {
        return isActive ? activeLink : normalLink;
    };

    return (
        <nav className='bg-surface-bg w-full h-20 px-2 border-b-2 border-accent-bg
        flex items-center border-r border-r-surface-muted-bg
        sm:w-60 sm:items-start sm:justify-start sm:h-full sm:pt-4'>
            <ol className='flex w-full sm:flex-col gap-4'>
                <li className=''>
                    <NavLink to={PAGE_PATHS.register} className={linkClass}>Studyhub</NavLink>
                </li>
                <li className='ml-auto sm:ml-0'>
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
    );
}