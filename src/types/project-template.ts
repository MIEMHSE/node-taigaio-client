export interface IProjectTemplateDefaultOptions {
    epic_status: string
    issue_status: string
    issue_type: string
    points: string
    priority: string
    severity: string
    task_status: string
    us_status: string
}

export interface IProjectTemplateEpicStatus {
    color: string
    is_closed: boolean
    name: string
    order: number
    slug: string
}

export interface IProjectTemplateIssueStatus {
    color: string
    is_closed: boolean
    name: string
    order: number
    slug: string
}

export interface IProjectTemplateIssueType {
    color: string
    name: string
    order: number
}

export interface IProjectTemplatePoint {
    name: string
    order: number
    value: string | null
}

export interface IProjectTemplatePriority {
    color: string
    name: string
    order: number
}

export interface IProjectTemplateRole {
    computable: boolean
    name: string
    order: number
    permissions: Array<string>
    slug: string
}

export interface IProjectTemplateSeverity {
    color: string
    name: string
    order: number
}

export interface IProjectTemplateTaskStatus {
    color: string
    is_closed: boolean
    name: string
    order: number
    slug: string
}

export interface IProjectTemplateUSStatus {
    color: string
    is_archived: boolean
    is_closed: boolean
    name: string
    order: number
    slug: string
    wip_limit: string | null
}

export interface IProjectTemplateDetails {
    created_date: string
    default_options: IProjectTemplateDefaultOptions
    default_owner_role: string
    description: string
    epic_statuses: Array<IProjectTemplateEpicStatus>
    id: number
    is_backlog_activated: boolean
    is_contact_activated: boolean
    is_epics_activated: boolean
    is_issues_activated: boolean
    is_kanban_activated: boolean
    is_wiki_activated: boolean
    issue_statuses: Array<IProjectTemplateIssueStatus>
    issue_types: Array<IProjectTemplateIssueType>
    modified_date: string
    name: string
    order: number
    points: Array<IProjectTemplatePoint>
    priorities: Array<IProjectTemplatePriority>
    roles: Array<IProjectTemplateRole>
    severities: Array<IProjectTemplateSeverity>
    slug: string
    task_statuses: Array<IProjectTemplateTaskStatus>
    us_statuses: Array<IProjectTemplateUSStatus>
    videoconferences: string | null
    videoconferences_extra_data: string
}
