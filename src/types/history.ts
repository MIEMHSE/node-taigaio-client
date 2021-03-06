export interface IHistoryEntry {
    comment: string
    comment_html: string
    created_at: string
    delete_comment_date: string | null
    delete_comment_user: string | null
    diff: unknown
    edit_comment_date: string | null
    id: string
    is_hidden: boolean
    is_snapshot: boolean
    key: string
    snapshot: string | null
    type: string
    user: {
        gravatar_id: string
        is_active: true
        name: string
        photo: string | null
        pk: string
        username: string
    }
    values: {
        users: unknown
    }
    values_diff: unknown
}

export type HistoryPageT = 'userstory' | 'task' | 'issue' | 'wiki';
