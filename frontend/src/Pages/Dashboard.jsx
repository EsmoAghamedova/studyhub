import { dashboardData } from '../Configs/DashboardData';
import Notes from '../Components/Notes'
import { formatHours } from '../Utility/util';
export function Dashboard() {
    const cardStyles = `flex flex-col items-center justify-center gap-2
    border border-t-2 border-b-2 border-primary-bg/40
    px-4 py-2 rounded-lg
    bg-surface-bg border border-l-4 border-r-4
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
                    <div className='flex items-center justify-center gap-4'>
                        <img className='w-15 h-15' src="/assets/streakicon.svg" alt="streakicon" />
                        <span className='text-6xl font-extrabold'>{dashboardData.stats.currentStreak}</span>
                    </div>
                    <div className='text-sm uppercase tracking-widest text-surface-fg/60'>Active streak</div>
                    <div className='text-sm text-surface-fg/40'>best: {dashboardData.stats.bestStreak}</div>
                </div>
            </main >
            <section className='flex flex-col gap-8'>
                <div className='flex flex-col w-full sm:grid sm:grid-cols-2 max-w-300 gap-6'>
                    <section>
                        <h1 className='text-3xl font-bold mb-4'>Recent Notes</h1>
                        <Notes mode='row' noteList={dashboardData.recentNotes} />
                    </section>
                    <section>
                        <h1 className='text-3xl font-bold mb-4'>Leaderboard</h1>
                        <Leaderboard list={dashboardData.leaderboard} />
                    </section>
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

function Leaderboard({ list }) {
    if (!list?.length) {
        return (
            <section className="text-center py-10 text-white/40 text-sm max-w-100">
                No one's logged hours yet.
                They are lazy... just like you, be the first and break the cycle?
                nope. You're king of lazyness.
            </section>
        );
    }

    const maxMinutes = Math.max(...list.map(l => l.totalMinutes));

    return (
        <section className='bg-surface-muted-bg p-5 flex flex-col gap-6 rounded-lg w-full max-w-120'>
            <div className='flex gap-6'>
                <div>
                    <div className='text-lg text-surface-muted-fg'>Total points</div>
                    <span className='text-xl font-medium'>{dashboardData.stats.points}</span>
                </div>
                <div>
                    <div className='text-lg text-surface-muted-fg'>Top subject</div>
                    <span className='text-xl font-medium'>{dashboardData.stats.topSubject} ( {formatHours(dashboardData.stats.topSubjectMin)} )</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 max-w-100">
                {list.map(listItem => {
                    const isTop3 = listItem.rank <= 3;
                    const fillPct = maxMinutes ? (listItem.totalMinutes / maxMinutes) * 100 : 0;

                    return (
                        <div
                            key={listItem.rank}
                            className={`
              relative grid grid-cols-[2rem_auto_auto] items-center gap-4
              rounded-lg px-4 py-3 overflow-hidden
              ${listItem?.self
                                    ? 'outline outline-accent-bg bg-primary-fg'
                                    : 'bg-primary-bg/30'}
            `}
                        >
                            <span
                                className={`text-sm ${isTop3 ? 'text-primary-bg font-semibold' : 'text-white/50'
                                    }`}
                            >
                                {String(listItem.rank).padStart(2, '0')}
                            </span>

                            <span className="relative capitalize font-extrabold">
                                {listItem?.self ? 'You' : listItem.username}
                            </span>

                            <span className="relative text-sm text-white/70 tabular-nums text-right">
                                {formatHours(listItem.totalMinutes)}
                            </span>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}