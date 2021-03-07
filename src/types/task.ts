export interface ITaskDetail {
    assigned_to: number
    assigned_to_extra_info: {
        big_photo: string | null
        full_name_display: string
        gravatar_id: string
        id: number
        is_active: boolean
        photo: string | null
        username: string
    }
    attachments: Array<string>
    blocked_note: string
    created_date: string
    due_date: string | null
    due_date_reason: string
    due_date_status: string
    external_reference:string | null
    finished_date: string
    id: number
    is_blocked: boolean
    is_closed: boolean
    is_iocaine: boolean
    is_voter: boolean
    is_watcher: boolean
    milestone: number
    milestone_slug: string
    modified_date: string
    owner: number
    owner_extra_info: {
        big_photo: string | null
        full_name_display: string
        gravatar_id: string
        id: number
        is_active: boolean
        photo: string | null
        username: string
    }
    project: number
    project_extra_info: {
        id: number
        logo_small_url: string | null
        name: string
        slug: string
    }
    ref: number
    status: number
    status_extra_info: {
        color: string
        is_closed: boolean
        name: string
    }
    subject: string
    tags: Array<Array<string|null>>
    taskboard_order: number
    total_comments: number
    total_voters: number
    total_watchers: number
    us_order: number
    user_story: number
    user_story_extra_info: {
        epics: Array<{
            color: string
            id: number
            project: {
                id: number
                name: string
                slug: string
            }
            ref: number
            subject: string
        }>
        id: number
        ref: number
        subject: string
    }
    version: number
    watchers: Array<number>
}

export interface ITaskFiltersDataDetail {
    assigned_to?: Array<{
        count: number
        full_name: string
        id: number | null
    }>
    owners?: Array<{
        count: number
        full_name: string
        id: number
    }>
    roles?: Array<{
        color: string | null
        count: number
        id: number
        name: string
        order: number
    }>
    statuses?: Array<{
        color: string
        count: number
        id: number
        name: string
        order: number
    }>
    tags?: Array<{
        color: string | null
        count: number
        name: string
    }>
}
