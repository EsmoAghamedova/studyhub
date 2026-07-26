import { NavLink } from 'react-router'; // Changed from 'react-router'
import { PAGE_PATHS } from '../Configs/Pages';

export function Navbar() {
  const activeLink = `font-light text-md px-2 rounded
    inline-flex items-center justify-center
    sm:text-2xl sm:px-4 sm:rounded-tr-md sm:rounded-br-md
    bg-primary-bg outline outline-accent-bg text-primary-fg transition-all duration-200`;

  const normalLink = `text-xs rounded
    sm:text-xl sm:px-4 inline-flex items-center justify-center
    px-2 py-1 text-surface-muted-fg
    hover:bg-primary-bg hover:text-primary-fg hover:outline outline-surface-muted-fg
    hover:text-md transition-all duration-200`;

  const linkClass = ({ isActive }) => {
    return isActive ? activeLink : normalLink;
  };

  return (
    <nav className="bg-surface-bg w-screen h-14 px-2
      flex items-center border-b border-surface-muted-bg
      sm:w-60 sm:items-start sm:justify-start sm:h-screen sm:pt-4 sm:border-b-0 sm:border-r">
      <ol className="flex w-full sm:flex-col gap-4">
        <li>
          <NavLink to={PAGE_PATHS.dashboard} className={linkClass}>
            📚 StudyHub
          </NavLink>
        </li>
        <li className="ml-auto sm:ml-0">
          <NavLink to={PAGE_PATHS.dashboard} className={linkClass}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to={PAGE_PATHS.leaderBoard} className={linkClass}>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink to={PAGE_PATHS.notes} className={linkClass}>
            Notes
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}