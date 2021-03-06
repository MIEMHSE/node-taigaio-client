export interface IProjectListEntryOwner {
    big_photo: string | null
    full_name_display: string
    gravatar_id: string
    id: number
    is_active: boolean
    photo: string | null
    username: string
}

export interface IProjectListEntry {
    anon_permissions: Array<string>
    blocked_code: string | null
    created_date: string
    creation_template: number
    default_epic_status: number
    default_issue_status: number
    default_issue_type: number
    default_points: number
    default_priority: number
    default_severity: number
    default_task_status: number
    default_us_status: number
    description: string
    i_am_admin: boolean
    i_am_member: boolean
    i_am_owner: boolean
    id: number
    is_backlog_activated: boolean
    is_contact_activated: boolean
    is_epics_activated: boolean
    is_fan: boolean
    is_featured: boolean
    is_issues_activated: boolean
    is_kanban_activated: boolean
    is_looking_for_people: boolean
    is_private: boolean
    is_watcher: boolean
    is_wiki_activated: boolean
    logo_big_url: string | null
    logo_small_url: string | null
    looking_for_people_note: string
    members: Array<number>
    modified_date: string
    my_homepage: boolean
    my_permissions: Array<string>
    name: string
    notify_level: number
    owner: IProjectListEntryOwner
    public_permissions: Array<string>
    slug: string
    tags: Array<string>
    tags_colors: string
    total_activity: number
    total_activity_last_month: number
    total_activity_last_week: number
    total_activity_last_year: number
    total_closed_milestones: number
    total_fans: number
    total_fans_last_month: number
    total_fans_last_week: number
    total_fans_last_year: number
    total_milestones:number | null
    total_story_points: number | null
    total_watchers: number
    totals_updated_datetime: string
    videoconferences: string | null
    videoconferences_extra_data: string | null
}

export type IProjectOrderBy = 'memberships__user_order' |
'total_fans' |
'total_fans_last_week' |
'total_fans_last_month' |
'total_fans_last_year' |
'total_activity' |
'total_activity_last_week' |
'total_activity_last_month' |
'total_activity_last_year';


export interface IProjectFilter {
    member?: number
    members?: Array<number>
    is_looking_for_people?: boolean
    is_featured?: boolean
    is_backlog_activated?: boolean
    is_kanban_activated?: boolean
    order_by?: IProjectOrderBy
}

export type IProjectVideoconference = 'whereby-com' | 'jitsi' | 'talky' | 'custom'

export interface IProjectCreateParams {
    name: string
    description: string
    creation_template: number
    is_backlog_activated: boolean
    is_issues_activated: boolean
    is_kanban_activated: boolean
    is_private: boolean
    is_wiki_activated: boolean
    videoconferences: IProjectVideoconference
    videoconferences_extra_data: string | null
    total_milestones: number
    total_story_points: number
}

export interface IProjectEpicCustomAttribute {
    created_date: string
    description: string
    extra: string | null
    id: number
    modified_date: string
    name: string
    order: number
    project_id: number
    type: string
}

export interface IProjectEpicStatus {
    color: string
    id: number
    is_closed: boolean
    name: string
    order: number
    project_id: number
    slug: string
}

export interface IProjectIssueStatus {
    created_date: string
    description: string
    extra: string | null
    id: number
    modified_date: string
    name: string
    order: number
    project_id: number
    type: string
}

export interface IProjectIssueDuedate {
    by_default: boolean
    color: string
    days_to_due: string | null
    id: number
    name: string
    order: number
    project_id: number
}

export interface IProjectIssueStatus {
    color: string
    id: number
    is_closed: boolean
    name: string
    order: number
    project_id: number
    slug: string
}

export interface IProjectIssueType {
    color: string
    id: number
    name: string
    order: number
    project_id: number
}

export interface IProjectMember {
    color: string
    full_name: string
    full_name_display: string
    gravatar_id: string
    id: number
    is_active: boolean
    photo: string | null
    role: number
    role_name: string
    username: string
}

export interface IProjectMilestone {
    closed: boolean
    id: number
    name: string
    slug: string
}

export interface IProjectOwner {
    big_photo: string | null
    full_name_display: string
    gravatar_id: string
    id: number
    is_active: boolean
    photo: string | null
    username: string
}

export interface IProjectPoint {
    id: number
    name: string
    order: number
    project_id: number
    value: number | null
}

export interface IProjectPriority {
    color: string
    id: number
    name: string
    order: number
    project_id: number
}

export interface IProjectRole {
    computable: boolean
    id: number
    name: string
    order: number
    permissions: Array<string>
    project_id: number
    slug: string
}

export interface IProjectSeverity {
    color: string
    id: number
    name: string
    order: number
    project_id: number
}

export interface IProjectTaskCustomAtribute {
    created_date: string
    description: string
    extra: string | null
    id: number
    modified_date: string
    name: string
    order: number
    project_id: number
    type: string
}

export interface IProjectTaskDuedate{
    by_default: boolean
    color: string
    days_to_due:string | null
    id: number
    name: string
    order: number
    project_id: number
}

export interface IProjectTaskStatus{
    color: string
    id: number
    is_closed: boolean
    name: string
    order: number
    project_id: number
    slug: string
}

export interface IProjectUSDuedate{
    by_default: boolean
    color: string
    days_to_due: null
    id: number
    name: string
    order: number
    project_id: number
}

export interface IProjectUserStatus{
    color: string
    id: number
    is_archived: boolean
    is_closed: boolean
    name: string
    order: number
    project_id: number
    slug: string
    wip_limit: null
}

export interface IProjectUserstoryCustomAttribute {
    created_date: string
    description: string
    extra: string | null
    id: number
    modified_date: string
    name: string
    order: number
    project_id: number
    type: string
}

export interface IProjectDetail {
    anon_permissions: Array<string>
    blocked_code: number | null
    created_date: string
    creation_template: number | null
    default_epic_status: number | null
    default_issue_status: number | null
    default_issue_type: number | null
    default_points: number | null
    default_priority: number | null
    default_severity: number | null
    default_task_status: number | null
    default_us_status: number | null
    description: string
    epic_custom_attributes: Array<IProjectEpicCustomAttribute>
    epic_statuses: Array<IProjectEpicStatus>
    epics_csv_uuid: number | null
    i_am_admin: boolean
    i_am_member: boolean
    i_am_owner: boolean
    id: number
    is_backlog_activated: boolean
    is_contact_activated: boolean
    is_epics_activated: boolean
    is_fan: boolean
    is_featured: boolean
    is_issues_activated: boolean
    is_kanban_activated: boolean
    is_looking_for_people: boolean
    is_out_of_owner_limits: boolean
    is_private: boolean
    is_private_extra_info: {
        can_be_updated: boolean
        reason: null
    }
    is_watcher: boolean
    is_wiki_activated: boolean
    issue_custom_attributes: Array<IProjectIssueStatus>
    issue_duedates: Array<IProjectIssueDuedate>
    issue_statuses: Array<IProjectIssueStatus>
    issue_types: Array<IProjectIssueType>
    issues_csv_uuid: number | null
    logo_big_url: string
    logo_small_url: string
    looking_for_people_note: string
    max_memberships: number | null
    members: Array<IProjectMember>
    milestones: Array<IProjectMilestone>
    modified_date: string
    my_homepage: boolean
    my_permissions: Array<string>
    name: string
    notify_level: number
    owner: IProjectOwner
    points: Array<IProjectPoint>
    priorities: Array<IProjectPriority>
    public_permissions: Array<string>
    roles: Array<IProjectRole>
    severities: Array<IProjectSeverity>
    slug: string
    tags: Array<string>
    tags_colors: string
    task_custom_attributes: Array<IProjectTaskCustomAtribute>
    task_duedates: Array<IProjectTaskDuedate>
    task_statuses: Array<IProjectTaskStatus>
    tasks_csv_uuid: number | null
    total_activity: number
    total_activity_last_month: number
    total_activity_last_week: number
    total_activity_last_year: number
    total_closed_milestones: number
    total_fans: number
    total_fans_last_month: number
    total_fans_last_week: number
    total_fans_last_year: number
    total_memberships: number
    total_milestones: number
    total_story_points: number
    total_watchers: number
    totals_updated_datetime: string
    transfer_token: string
    us_duedates: Array<IProjectUSDuedate>
    us_statuses: Array<IProjectUserStatus>
    userstories_csv_uuid: number | null
    userstory_custom_attributes: Array<IProjectUserstoryCustomAttribute>
    videoconferences: string | null
    videoconferences_extra_data: string | null
}

export interface IBulkUpdateOrderProject {
    order: number
    project_id: number
}

export interface IProjectModulesConfiguration {
    bitbucket: {
        secret: string
        valid_origin_ips: Array<string>
        webhooks_url: string
    }
    github: {
        secret: string
        webhooks_url: string
    }
    gitlab: {
        secret: string
        valid_origin_ips: Array<string>
        webhooks_url: string
    }
    gogs: {
        secret: string
        webhooks_url: string
    }
}

export interface IProjectStatsMilestone {
    client_increment: number
    evolution: number
    name: string
    optimal: number
    team_increment: number
}


export interface IProjectStatsDetail {
    assigned_points: number
    assigned_points_per_role: {
        [role_name: string] : number
    }
    closed_points: number
    closed_points_per_role: {
        [role_name: string] : number
    }
    defined_points: number
    defined_points_per_role: {
        [role_name: string] : number
    }
    milestones: Array<IProjectStatsMilestone>
    name: string
    speed: number
    total_milestones: number
    total_points: number
}

export interface IProjectIssueDetail {
    color: string
    count: number
    id: number
    name: string
    username: string
}

export interface IProjectIssueStatsDetail {
    closed_issues: number
    issues_per_assigned_to: {
        [issue_name: string]: IProjectIssueDetail
    }
    issues_per_owner: {
        [issue_name: string]: IProjectIssueDetail
    }
    issues_per_priority: {
        [issue_name: string]: IProjectIssueDetail
    }
    issues_per_severity: {
        [issue_name: string]: IProjectIssueDetail
    }
    issues_per_status: {
        [issue_name: string]: IProjectIssueDetail
    }
    issues_per_type: {
        [issue_name: string]: IProjectIssueDetail
    }
    last_four_weeks_days: {
        by_open_closed: {
            closed: Array<number>
            open: Array<number>
        }
        by_priority: {
            [issue_name: string]: IProjectIssueDetail
        }
        by_severity: {
            [issue_name: string]: {
                color: string
                data: Array<number>
                id: number
                name: string
            }
        }
        by_status: {
            [issue_name: string]: IProjectIssueDetail
        }
    }
    opened_issues: number
    total_issues: number
}

export interface IProjectTagColors {
    [tag_name: string]: [color: string]
}

export interface IProjectVoter {
    full_name: string
    id: number
    username: string
}

export interface IProjectWatcher {
    full_name: string
    id: number
    username: string
}

