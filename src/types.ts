export interface Owner {
    username: string
    full_name_display: string
    photo?: string
    big_photo?: string
    gravatar_id: string
    is_active: boolean
    id: number
}

export interface Project {
    id: number
    name: string
    slug: string
    description: string
    created_date: string
    modified_date: string
    owner: Owner
    members: Array<number>
    total_milestones?: number
    total_story_points?: number
    is_contact_activated: boolean
    is_epics_activated: boolean
    is_backlog_activated: boolean
    is_kanban_activated: boolean
    is_wiki_activated: boolean
    is_issues_activated: boolean
    videoconferences?: string
    videoconferences_extra_data?: string
    creation_template: number
    is_private: boolean
    anon_permissions: Array<string>
    public_permissions: Array<string>
    is_featured: boolean
    is_looking_for_people: boolean
    looking_for_people_note: string
    blocked_code?: number
    totals_updated_datetime: string
    total_fans: number
    total_fans_last_week: number
    total_fans_last_month: number
    total_fans_last_year: number
    total_activity: number
    total_activity_last_week: number
    total_activity_last_month: number
    total_activity_last_year: number
    tags: Array<string>
    tags_colors: Record<string, string|null>
    default_epic_status: number
    default_points: number
    default_us_status: number
    default_task_status: number
    default_priority: number
    default_severity: number
    default_issue_status: number
    default_issue_type: number
    my_permissions: Array<string>
    i_am_owner: boolean
    i_am_admin: boolean
    i_am_member: boolean
    notify_level?: number
    total_closed_milestones: number
    is_watcher: boolean
    total_watchers: number
    logo_small_url?: string
    logo_big_url?: string
    is_fan: boolean
    my_homepage: string
}

export interface ProjectExtraInfo {
    name: string
    slug: string
    logo_small_url?: string
    id: number
}

export interface ProjectsFilter {
    member?: number
    members?: Array<number>
    is_looking_for_people?: boolean
    is_featured?: boolean
    is_backlog_activated?: boolean
    is_kanban_activated?: boolean
}

export interface CreateProjectOptions {
    creation_template: number
    description: string
    is_backlog_activated: boolean
    is_issues_activated: boolean
    is_kanban_activated: boolean
    is_private: boolean
    is_wiki_activated: boolean
    name: string
    total_milestones: number
    total_story_points: number
    videoconferences?: string
    videoconferences_extra_data?: string
}

export enum ProjectsOrderBy {
    MEMBERSHIPS__USER_ORDER = 'memberships__user_order',
    TOTAL_FANS = 'total_fans',
    TOTAL_FANS_LAST_WEEK = 'total_fans_last_week',
    TOTAL_FANS_LAST_MONTH = 'total_fans_last_month',
    TOTAL_FANS_LAST_YEAR = 'total_fans_last_year',
    TOTAL_ACTIVITY = 'total_activity',
    TOTAL_ACTIVITY_LAST_WEEK = 'total_activity_last_week',
    TOTAL_ACTIVITY_LAST_MONTH = 'total_activity_last_month',
    TOTAL_ACTIVITY_LAST_YEAR = 'total_activity_last_year'
}

export interface UserDetail extends UserContactDetail {
    total_private_projects: number
    total_public_projects: number
    email: string
    uuid: string
    date_joined: string
    read_new_terms: boolean
    accepted_terms: boolean
    max_private_projects?: number
    max_public_projects?: number
    max_memberships_private_projects?: number
    max_memberships_public_projects?: number
    verified_email: boolean
}

export interface UserAuthDetail extends UserDetail {
    auth_token: string
}

export interface UserContactDetail {
    id: number
    username: string
    full_name: string
    full_name_display: string
    color: string
    bio: string
    lang: string
    theme: string
    timezone: string
    is_active: true
    photo?: string
    big_photo?: string
    gravatar_id: string
    roles: Array<string>    
}

export interface UserStatsDetail {
    roles: Array<string>
    total_num_closed_userstories: number
    total_num_contacts : number
    total_num_projects: number
}

export interface WikiPage {
    project: number
    project_extra_info: ProjectExtraInfo
    is_watcher: boolean
    total_watchers: number
    id: number
    slug: string
    content: string
    owner: number
    last_modifier: number
    created_date: string
    modified_date: string
    html: string
    editions: number
    version: number
}

export interface WikiLink {
    href: string
    id: number
    order: number
    project: number
    title: string
}
