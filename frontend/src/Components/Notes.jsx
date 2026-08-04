import { formatTimeAgo, trimText } from "../Utility/util"

export default function Notes({ mode = 'card', noteList }) {
    return (
        <div className={mode === 'card' ? 'flex flex-wrap gap-4' : 'flex flex-col gap-3'}>
            {noteList.map(note =>
                mode === 'card'
                    ? <NoteCard key={note.id} note={note} />
                    : <RowNote key={note.id} note={note} />
            )}
        </div>
    )
}

function RowNote({ note }) {
    return (
        <div className="flex items-center gap-4 bg-surface-muted-bg rounded-xl p-4">
            <h3 className="font-medium max-w-40 truncate">{note.title}</h3>
            <span className="bg-primary-bg outline outline-surface-bg text-primary-fg
            px-4 py-0.5 rounded-full text-xs">
                {note.category}
            </span>
            <p className="text-sm text-secondary-fg/70 min-w-0 truncate flex-1">{trimText(note.content)}</p>
            <span className="ml-auto shrink-0 text-xs text-secondary-fg/50">{formatTimeAgo(note.created_at)}</span>
        </div>
    )
}

function NoteCard({ note }) {
    return (
        <div className="w-50 gap-3 grid grid-cols-[2rem_2rem_auto_auto] bg-primary-bg text-primary-fg rounded-xl p-4">
            <h3 className="font-bold truncate">{note.title}</h3>
            <span className="bg-primary-bg/50 outline outline-surface-bg text-primary-fg
            px-4 py-0.5 rounded-full text-xs">
                {note.category}
            </span>
            <p className="text-sm text-primary-fg/60 flex-1">{trimText(note.content)}</p>
            <span className="text-xs text-primary-fg/40">{formatTimeAgo(note.created_at)}</span>
        </div>
    )
}