import axios, { AxiosInstance } from 'axios';

import { 
    Project,
    ProjectsFilter,
    CreateProjectOptions,
    ProjectsOrderBy,
    UserDetail,
    UserAuthDetail,
    UserContactDetail,
    UserStatsDetail,
    WikiPage,
    WikiLink
} from './';

export class TaigaClientFactory {
    constructor() {
        return ;
    }

    /**
     * Create Base Client which can use only functions that do not require authentication
     * @param url
     * @returns BaseClient
     */
    static createBaseClient(url = 'localhost') : TaigaBaseClient {
        if (process.env.TAIGA_URL) {
            return new TaigaBaseClient(process.env.TAIGA_URL);
        }
        return new TaigaBaseClient(url);
    }

    /**
     * Create Auth Client which can use all functions
     * @param url
     * @param login
     * @param password
     * @returns AuthClient or undefined if authentication failed or url does not exist
     */
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
     * Get all projects.
     * @param filter
     * @param orderBy
     * @returns Array of Projects or undefined if projects do not exist
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
            return undefined;
        }
    }

    /**
     * Get a project by id.
     * @param id - project id
     * @returns Project or undefined if project does not exist
     */
    async getProject(id: number) : Promise<Project|undefined> {
        try {
            const response = await this.instance.get<Project>(`/projects/${id}`);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Get a project by slug.
     * @param slug - project slug
     * @returns Project or undefined if project does not exist
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
            return undefined;
        }
    }

    /**
     * All users contact deatail
     * @param projectId - project id
     * @returns Array of UserContactDetails or undefined if the project does not exist
     */
    async getAllUsersContactDetail(projectId?: number) : Promise<Array<UserContactDetail>|undefined>{
        try {
            const response = await this.instance.get<Array<UserContactDetail>>('/users', {
                params: {
                    project: projectId
                }
            });
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * All users contact deatail
     * @param userId - user id
     * @returns UserContactDetails or undefined if the user does not exist
     */
    async getUserContactDetail(userId?: number) : Promise<UserContactDetail|undefined>{
        try {
            const response = await this.instance.get<UserContactDetail>(`/users/${userId}`);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * All users stats deatail
     * @param userId - user id
     * @returns UserContactDetails or undefined if the user does not exist
     */
    async getUserStats(userId?: number) : Promise<UserStatsDetail|undefined>{
        try {
            const response = await this.instance.get<UserStatsDetail>(`/users/${userId}/stats`);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Get all wiki pages
     * @param project - project id filtered
     * @returns Array of WikiPages or undefined if project does not exist
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
            return undefined;
        }
    }

    /**
     * Get a wiki page by id.
     * @param id - wiki page id
     * @returns WikiPage or undefined if wiki page does not exist
     */
    async getWikiPage(id: number) : Promise<WikiPage|undefined> {
        try {
            const response = await this.instance.get<WikiPage>(`/wiki/${id}`);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }


    /**
     * Get all wiki links
     * @param project - project id filtered
     * @returns Array of WikiLinks or undefined if project does not exist
     */
    async getAllWikiLinks(project?: number) : Promise<Array<WikiLink>|undefined> {
        try {
            const response = await this.instance.get<Array<WikiLink>>('/wiki-links', {
                params: {
                    project
                }
            });
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Get a wiki link by id.
     * @param id - wiki link id
     * @returns WikiLink or undefined if wiki link does not exist
     */
    async getWikiLink(id: number) : Promise<WikiLink|undefined> {
        try {
            const response = await this.instance.get<WikiLink>(`/wiki-links/${id}`);
            return response.data;
        } catch (error) {
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
                return false;
            }
        }
        return false;
    }

    private async login(login: string, password: string) : Promise<UserAuthDetail|undefined>{
        try {
            const response = await this.instance.post<UserAuthDetail>('/auth', {
                type: 'normal',
                username: login,
                password
            });
            this.isLogin = true;
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Create a project by id
     * @returns is this project created
     */
    async createProject(options: CreateProjectOptions) : Promise<boolean>{
        if (!this.isLogin) {
            return false;
        }
        try {
            await this.instance.post('/projects', options);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Edit project name or/and project description 
     * @param id - project id
     * @param name - new project name
     * @param description - new project description
     * @returns is this project changed
     */
    async editProject(id: number, name?: string, description?: string) : Promise<boolean>{
        if (!this.isLogin) {
            return false;
        }
        try {
            await this.instance.patch(`/projects/${id}`, {
                name,
                description
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Delete project
     * @param id - project id
     * @returns is this project deleted
     */
    async deleteProject(id: number) : Promise<boolean>{
        if (!this.isLogin) {
            return false;
        }
        try {
            await this.instance.delete(`/projects/${id}`);
            return true;
        } catch (error) {
            return false;
        }
    }  
    
    /**
     * Delete project
     * @param id - project id
     * @returns your contact detail data or undefined if there is no login
     */
    async getMeContactDetail() : Promise<UserDetail|undefined>{
        if (!this.isLogin) {
            return undefined;
        }
        try {
            const response = await this.instance.get<UserDetail>('/users/me');
            return response.data;
        } catch (error) {
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
}

export type { TaigaBaseClient, TaigaAuthClient };
