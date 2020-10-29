import axios from 'axios';

interface ProjectExtraInfo {
    name: string
    slug: string
    logo_small_url: string|null
    id: number
}

interface WikiPage {
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

interface User {
    username: string
    full_name_display: string
    photo: string|null
    big_photo: string|null
    gravatar_id: string
    is_active: boolean,
    id: number
}

interface Project {
    id: number
    name: string
    slug: string
    description: string
    created_date: string
    modified_date: string
    owner: User
    members: Array<number>
    total_milestones: number|null,
    total_story_points: number|null
    is_contact_activated: boolean
    is_epics_activated: boolean
    is_backlog_activated: boolean
    is_kanban_activated: boolean
    is_wiki_activated: boolean
    is_issues_activated: boolean
    videoconferences: string|null
    videoconferences_extra_data: string|null
    creation_template: number
    is_private: boolean
    anon_permissions: Array<string>
    public_permissions: Array<string>
    is_featured: boolean
    is_looking_for_people: boolean
    looking_for_people_note: string
    blocked_code: number|null
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
    notify_level: number|null
    total_closed_milestones: number
    is_watcher: boolean
    total_watchers: number
    logo_small_url: string|null
    logo_big_url: string|null
    is_fan: boolean
    my_homepage: string
}

export class Client {

    private url: string;

    constructor(url: string) {
        this.url = url;
        return ;
    }

    async getAllWikiPages() : Promise<Array<WikiPage>> {
        const response = await axios.get<Array<WikiPage>>(`${this.url}/api/v1/wiki`);
        return response.data;
    }

    async getWikiPage(id: number) : Promise<WikiPage> {
        const response = await axios.get<WikiPage>(`${this.url}/api/v1/wiki/${id}`);
        return response.data;
    }

    async getAllProjects() : Promise<Array<Project>> {
        const response = await axios.get<Array<Project>>(`${this.url}/api/v1/projects`);
        return response.data;
    }

    async getProject(id: number) : Promise<Project> {
        const response = await axios.get<Project>(`${this.url}/api/v1/projects/${id}`);
        return response.data;
    }
}
