import axios, { AxiosInstance } from 'axios';

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

interface Person {
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
    owner: Person
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

interface User {
    id: number
    username: string
    full_name: string
    full_name_display: string
    color: string
    bio: string
    lang: string
    theme: string
    timezone: string
    is_active: true,
    photo: string|null
    big_photo: string|null
    gravatar_id: string
    roles: Array<string>
    total_private_projects: number
    total_public_projects: number
    email: string
    uuid: string
    date_joined: string
    read_new_terms: boolean
    accepted_terms: boolean
    max_private_projects: number|null,
    max_public_projects: number|null,
    max_memberships_private_projects: number|null,
    max_memberships_public_projects: number|null,
    verified_email: boolean
    auth_token: string
}

export class ClientFactory {
    constructor() {
        return ;
    }

    async createClient(url: string, login: string, password: string) : Promise<Client> {
        const client = new Client(url);
        await client.init(login, password);
        return client;
    }
}

export class Client {

    private url: string;
    private instance: AxiosInstance;

    constructor(url: string) {
        this.url = url + '/api/v1';
        this.instance = axios;
        return ;
    }

    async init(login: string, password: string) : Promise<void> {
        this.instance = axios.create({
            baseURL: this.url,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${(await this.login(login, password)).auth_token}`
            }
        });
        return ;
    }

    async login(login: string, password: string) : Promise<User>{
        const response = await axios.post<User>(`${this.url}/auth`, {
            type: 'normal',
            username: login,
            password
        });
        return response.data;
    }

    async getAllWikiPages() : Promise<Array<WikiPage>> {
        const response = await this.instance.get<Array<WikiPage>>('/wiki');
        return response.data;
    }

    async getWikiPage(id: number) : Promise<WikiPage> {
        const response = await this.instance.get<WikiPage>(`/wiki/${id}`);
        return response.data;
    }

    async createWikiPage(id: number, slug: string, content: string, watchers: Array<number>) : Promise<boolean>{
        try {
            await this.instance.post('/wiki', {
                project: id,
                slug,
                content,
                watchers
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    async getAllProjects() : Promise<Array<Project>> {
        const response = await this.instance.get<Array<Project>>('/projects');
        return response.data;
    }

    async getProject(id: number) : Promise<Project> {
        const response = await this.instance.get<Project>(`/projects/${id}`);
        return response.data;
    }

    async createProject(
        creation_template: number,
        description: string,
        is_backlog_activated: boolean,
        is_issues_activated: boolean,
        is_kanban_activated: boolean,
        is_private: boolean,
        is_wiki_activated: boolean,
        name: string,
        total_milestones: number,
        total_story_points: number,
        videoconferences: string|null,
        videoconferences_extra_data: string|null
    ) : Promise<boolean>{
        try {
            await this.instance.post('/projects', {
                creation_template,
                description,
                is_backlog_activated,
                is_issues_activated,
                is_kanban_activated,
                is_private,
                is_wiki_activated,
                name,
                total_milestones,
                total_story_points,
                videoconferences,
                videoconferences_extra_data
            });
            return true;
        } catch (error) {
            return false;
        }
    }
}
