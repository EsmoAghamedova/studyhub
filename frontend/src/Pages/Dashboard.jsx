import { dashboardData } from '../Configs/DashboardData';
import Notes from '../Components/Notes'
import { formatHours } from '../Utility/util';
export function Dashboard() {
    const cardStyles = `flex flex-col items-center gap-2
    border border-t-2 border-b-2 border-primary-bg/20
    px-4 py-2
    bg-surface-bg
    hover:outline hover:outline-offset-8 hover:outline-accent-bg`
    return (
        <section className='flex flex-col gap-6'>
            <h1 className='text-4xl'>Welcome back, <span
                className='capitalize font-extrabold'>
                {dashboardData.user.username}
            </span>
            </h1>
            <main className='sm:grid sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] flex flex-col gap-6'>
                <div className={cardStyles}>
                    <span className='text-sm uppercase tracking-widest text-surface-fg/60'>Total hours</span>
                    <span className='text-4xl font-extrabold leading-none'>
                        {formatHours(dashboardData.stats.totalMinutes)}
                    </span>
                    <hr className='opacity-40 w-full m-2 ' />
                    <div className='flex items-baseline gap-2 text-2xl text-surface-fg/40'>
                        <span className='font-medium'>{dashboardData.stats.topSubject}</span>
                        <span>{formatHours(dashboardData.stats.topSubjectMin)}</span>
                    </div>
                </div>

                <div className={cardStyles}>
                    <span className='text-sm uppercase tracking-widest text-surface-fg/60'>Notes</span>
                    <div className='flex items-baseline gap-2'>
                        <span className='text-5xl font-extrabold leading-none'>{dashboardData.stats.totalNotes}</span>
                        <span className='text-sm text-surface-fg/40'>total</span>
                    </div>
                    <div className='text-sm text-surface-fg/40'>{dashboardData.stats.totalSessions} sessions logged</div>
                    <div className='text-lg text-surface-fg/40 mt-1'>
                        Avg <span className='font-semibold text-neutral-200'>{avgWordCount(dashboardData.recentNotes)}</span> words / note
                    </div>
                </div>

                <div className={cardStyles}>
                    <img className='w-20 h-20' src="/assets/streakicon.svg" alt="streakicon" />
                    <div className='text-3xl font-extrabold'>Active streak <span>{dashboardData.stats.currentStreak}</span></div>
                    <div className='text-2xl'>best: {dashboardData.stats.bestStreak}</div>
                </div>
            </main >
            <section>
                <h1 className='text-2xl'>Recent Notes</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2'>
                    <Notes mode='row' noteList={dashboardData.recentNotes} />
                </div>
            </section>
        </section >
    )
}

function avgWordCount(notes) {
    if (!notes.length) return 0;
    const total = notes.reduce((sum, note) => sum + note.content.trim().split(/\s+/).length, 0);
    return Math.round(total / notes.length);
}