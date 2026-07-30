import { dashboardData } from '../Configs/DashboardData';
import Notes from '../Components/Notes'
import { formatHours } from '../Utility/util';
export function Dashboard() {
    const cardStyles = `flex flex-col items-center justify-center sm:gap-2
    border border-t-2 border-b-2 border-primary-bg/40
    px-2 py-4 gradient-bg
    bg-surface-bg border border-l-4 border-r-4
    lg:rounded-br-4xl lg:rounded-tl-4xl rounded-tl-2xl rounded-br-2xl
    hover:outline hover:outline-offset-8 hover:outline-accent-bg
    sm:py-6`;
    const contentStyles = 'text-[clamp(2vh,1.3rem,1.5rem)] font-extrabold';
    return (
        <section className='flex flex-col gap-6'>
            <h1 className='text-4xl'>Welcome back, <span
                className='capitalize font-extrabold'>
                {dashboardData.user.username}
            </span>
            </h1>
            <main className='grid lg:grid-cols-3 sm:gap-6 gap-2 grid-cols-2 max-w-350'>
                <div className={cardStyles}>
                    <span className='text-sm uppercase tracking-widest text-surface-fg/60'>Total hours</span>
                    <span className={contentStyles}>
                        {formatHours(dashboardData.stats.totalMinutes)}
                    </span>
                    <hr className='opacity-40 w-full m-2 ' />
                    <div className='flex items-baseline gap-2 text-sm md:text-xl text-surface-fg/40'>
                        <span className='font-medium'>{dashboardData.stats.topSubject}</span>
                        <span>{formatHours(dashboardData.stats.topSubjectMin)}</span>
                    </div>
                </div>

                <div className={cardStyles}>
                    <span className='text-sm uppercase tracking-widest text-surface-fg/60'>Notes</span>
                    <div className='flex items-baseline gap-2'>
                        <span className={contentStyles}>{dashboardData.stats.totalNotes}</span>
                        <span className='text-xs sm:text-sm text-surface-fg/40'>total</span>
                    </div>
                    <div className='text-sm text-surface-fg/40'>{dashboardData.stats.totalSessions} sessions logged</div>
                    <div className='sm:text-sm md:text-lg lg:text-xl text-xs text-surface-fg/40 mt-1'>
                        Avg <span className='font-semibold text-neutral-200'>{avgWordCount(dashboardData.recentNotes)}</span> words / note
                    </div>
                </div>

                <div className={`${cardStyles} col-span-2 lg:col-span-1`}>
                    <div className='flex items-center justify-center gap-4'>
                        <img className='w-15 h-15' src="/assets/streakicon.svg" alt="streakicon" />
                        <span className='text-6xl font-extrabold'>{dashboardData.stats.currentStreak}</span>
                    </div>
                    <div className='text-sm uppercase tracking-widest text-surface-fg/60'>Active streak</div>
                    <div className='text-sm text-surface-fg/40'>best: {dashboardData.stats.bestStreak}</div>
                </div>
            </main >
            <NotesAndLeaderboard />
        </section >
    )
}

function avgWordCount(notes) {
    if (!notes.length) return 0;
    const total = notes.reduce((sum, note) => sum + note.content.trim().split(/\s+/).length, 0);
    return Math.round(total / notes.length);
}

function NotesAndLeaderboard() {
    const headingStyles = 'sm:text-3xl text-xl font-bold mb-4';
    return (
        <section className='flex flex-col gap-8 text-surface-fg mt-16'>
            <div className='flex flex-col w-full max-w-200 gap-12'>
                <section>
                    <div className='flex items-baseline'>
                        <h1 className={headingStyles}>Recent Notes</h1>
                        <span className='ml-auto text-surface-muted-fg text-xs hover:text-page-fg
                        flex gap-1'>All
                            <svg xmlns="http://www.w3.org/2000/svg" className='w-2 aspect-square'
                                viewBox="0 0 48 48">
                                <path fill="currentcolor" d="M17.1 5L14 8.1L29.9 24L14 39.9l3.1 3.1L36 24z"></path>
                            </svg>
                        </span>
                    </div>
                    <Notes mode='row' noteList={dashboardData.recentNotes} />
                </section>
                <section>
                    <h1 className={headingStyles}>Leaderboard</h1>
                    <Leaderboard list={dashboardData.leaderboard} />
                </section>
            </div>
        </section>
    )
}


function Leaderboard({ list }) {
    if (!list?.length) {
        return (
            <section className="text-center py-10 text-white/40 text-sm max-w-200 gradient-bg">
                No one's logged hours yet.
                They are lazy... just like you, be the first and break the cycle?
                nope. You're king of lazyness.
            </section>
        );
    }

    const maxMinutes = Math.max(...list.map(l => l.totalMinutes));

    return (
        <section className='bg-surface-muted-bg gradient-bg
        border-b border-r border-primary-bg/30
        drop-shadow-xl drop-shadow-primary-bg/30
        p-5 flex flex-col gap-6 rounded-lg w-full max-w-200'>
            <div className='flex gap-6'>
                <div>
                    <div className='text-lg text-surface-muted-fg'>Total points</div>
                    <span className='text-xl font-medium'>{dashboardData.stats.points}</span>
                </div>
                <div>
                    <div className='sm:text-2xl text-xl text-surface-muted-fg'>Top subject</div>
                    <span className='sm:text-xl text-sm font-medium'>{dashboardData.stats.topSubject} ( {formatHours(dashboardData.stats.topSubjectMin)} )</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-150">
                {list.map(listItem => {
                    const isTop3 = listItem.rank <= 3;
                    return (
                        <div
                            key={listItem.rank}
                            className={`
                                relative grid grid-cols-[1rem_1fr_1fr_auto] items-center gap-4
                                rounded-lg p-2 lg:px-4 lg:py-3 overflow-hidden
                                ${listItem?.self
                                    ? 'outline outline-accent-bg bg-primary-fg'
                                    : 'bg-primary-bg/30'}
            `}
                        >
                            <span
                                className={`md:text-sm text-xs ${isTop3 ? 'text-primary-bg font-semibold' : 'text-white/50'
                                    }`}
                            >
                                {String(listItem.rank).padStart(2, '0')}
                            </span>

                            <span className="relative capitalize font-semibold text-xs">
                                {listItem?.self ? 'You' : listItem.username}
                            </span>

                            <span className='text-xs text-right'>{listItem.points} pts</span>

                            <span className="relative text-xs text-white/70 tabular-nums text-right">
                                {formatHours(listItem.totalMinutes)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}