import axios, { AxiosInstance } from 'axios';

export interface ProjectExtraInfo {
    name: string
    slug: string
    logo_small_url?: string
    id: number
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

export interface Person {
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
    owner: Person
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

export interface User {
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
    auth_token: string
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

export interface ProjectsFilter {
    member?: number
    members?: Array<number>
    is_looking_for_people?: boolean
    is_featured?: boolean
    is_backlog_activated?: boolean
    is_kanban_activated?: boolean
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

export class TaigaClientFactory {
    constructor() {
        return ;
    }
    static createBaseClient(url = 'localhost') : TaigaBaseClient {
        if (process.env.TAIGA_URL) {
            return new TaigaBaseClient(process.env.TAIGA_URL);
        }
        return new TaigaBaseClient(url);
    }

    static async createAuthClient(url = 'localhost', login = '', password = '') : Promise<TaigaAuthClient|undefined> {
        if (process.env.TAIGA_URL && process.env.TAIGA_LOGIN && process.env.TAIGA_PASSWORD) {
            const client = new TaigaAuthClient(process.env.TAIGA_URL);
            if (await client.init(process.env.TAIGA_LOGIN, process.env.TAIGA_PASSWORD)){
                return client;
            }
            return undefined;
        }
        const client = new TaigaAuthClient(url);
        if (await client.init(login, password)){
            return client;
        }
        return undefined;
    }
}

class TaigaBaseClient {

    protected url: string;
    protected instance: AxiosInstance;

    constructor(url: string) {
        this.url = url + '/api/v1';
        this.instance = axios.create({
            baseURL: this.url,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
    }

    /**
     * Get all wiki pages
     * @param project - project id filtered
     * @returns Array of WikiPages
     */
    async getAllWikiPages(project?: number) : Promise<Array<WikiPage>|undefined> {
        try {
            const response = await this.instance.get<Array<WikiPage>>('/wiki', {
                params: {
                    project
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    /**
     * Get a wiki page by id.
     * @param id - wikipage id
     * @returns WikiPage
     */
    async getWikiPage(id: number) : Promise<WikiPage|undefined> {
        try {
            const response = await this.instance.get<WikiPage>(`/wiki/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    /**
     * Get all projects.
     * @param filter
     * @param orderBy
     * @returns Array of Projects
     */
    async getAllProjects(filter?: ProjectsFilter, orderBy?: ProjectsOrderBy) : Promise<Array<Project>|undefined> {
        try {
            const response = await this.instance.get<Array<Project>>('/projects', {
                params: {
                    ...filter,
                    orderBy
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    /**
     * Get a project by id.
     * @param id - project id
     * @returns Project
     */
    async getProject(id: number) : Promise<Project|undefined> {
        try {
            const response = await this.instance.get<Project>(`/projects/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    /**
     * Get a project by slug.
     * @param slug - project slug
     * @returns Project
     */
    async getProjectBySlug(slug: string) : Promise<Project|undefined> {
        try {
            const response = await this.instance.get<Project>('/projects/by_slug', {
                params: {
                    slug
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}

class TaigaAuthClient extends TaigaBaseClient {

    private isLogin = false;

    /**
     * Class initialize: authorization
     * @param url - your organization's taiga site
     */
    constructor(url: string) {
        super(url);
    }

    /**
     * Class initialize: authorization
     * @param login in taiga
     * @param password in taiga
     */
    async init(login: string, password: string) : Promise<boolean> {
        const loginData = await this.login(login, password);
        if (loginData) {
            const auth_token = loginData.auth_token;
            try {
                this.instance = axios.create({
                    baseURL: this.url,
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${auth_token}`
                    }
                });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
        return false;
    }

    /**
     * Authorization in taiga
     * @param login in taiga
     * @param password in taiga
     * @returns User
     */
    private async login(login: string, password: string) : Promise<User|undefined>{
        try {
            const response = await this.instance.post<User>('/auth', {
                type: 'normal',
                username: login,
                password
            });
            this.isLogin = true;
            return response.data;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    /**
     * Create a wiki page by id
     * @param id - project id
     * @param slug - short page name
     * @param content - page written in text/html/markdown format
     * @param watchers - array of watchers id
     * @returns is this page created
     */
    async createWikiPage(id: number, slug: string, content: string, watchers: Array<number>) : Promise<boolean>{
        if (!this.isLogin) {
            new Error('Error: Try to create wiki page without do not login.');
            return false;
        }

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

    /**
     * Create a project by id
     * @returns is this project created
     */
    async createProject(options: CreateProjectOptions) : Promise<boolean>{
        if (!this.isLogin) {
            new Error('Error: Try to create project without do not login.');
            return false;
        }
        try {
            await this.instance.post('/projects', options);
            return true;
        } catch (error) {
            return false;
        }
    }
}

export type { TaigaBaseClient, TaigaAuthClient };
