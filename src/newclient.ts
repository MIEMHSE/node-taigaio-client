import { IProjectTemplateDetails } from './types/project-template';
import { IUserStorage } from './types/user-storage';
import { ISearchResults } from './types/search';
import { IProjectResolve, IUserStoryResolve, IIssueResolve, ITaskResolve, IMilestoneResolve, IWikiPageResolve, IMultipleResolve } from './types/resolver';
import { IAuthorizationCode, ICypheredToken } from './types/auth';
import { IPrivateRegistryParams, IPublicRegistryParams, IUserAuthenticationDetail, IApplication, IApplicationToken } from './types';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class TaigaClient {
    private _url: string;
    private _isDisablePagination = true;
    private _languageId = 'en';
    private _instance: AxiosInstance;
    private _isLogin = false;

    /**
     * Create a TaigaClient
     * @param url taiga sever url
     * @param isDisablePagination is disable pagination in all queries
     * @param languageId the LanguageId can be chosen from the value list of available languages.
     */
    constructor(url = 'localhost:8000', isDisablePagination = true, languageId = 'en', authToken?: string) {
        this._url = url + '/api/v1';
        this._isDisablePagination = isDisablePagination;
        this._languageId = languageId;
        if (authToken) {
            this._instance = axios.create({
                baseURL: this._url,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-disable-pagination': `${isDisablePagination ? 'True' : 'False'}`,
                    'Accept-Language': languageId,
                    'Authorization': `Bearer ${authToken}`
                }
            });
            this._isLogin = true;
        } else {
            this._instance = axios.create({
                baseURL: this._url,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-disable-pagination': `${isDisablePagination ? 'True' : 'False'}`,
                    'Accept-Language': languageId
                }
            });
        }
    }

    /**
     * Rewrite axios instance
     * @param authToken - new auth token
     */
    private _authorize(authToken: string) : void {
        this._instance = axios.create({
            baseURL: this._url,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'x-disable-pagination': `${this._isDisablePagination ? 'True' : 'False'}`,
                'Accept-Language': this._languageId,
                'Authorization': `Bearer ${authToken}`
            }
        });
        this._isLogin = true;
    }

    // //////////////////////////////////////////////////////////////////////////////
    // Request templates
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * Axios get request with cheking
     */
    private async _getRequest<T>(url: string, config?: AxiosRequestConfig) : Promise<T | undefined> {
        if (!this._isLogin)
            return undefined;

        try {
            const response = await this._instance.get<T>(url, config);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Axios delete request with cheking
     */
    private async _deleteRequest(url: string, config?: AxiosRequestConfig) : Promise<boolean> {
        if (!this._isLogin)
            return false;

        try {
            await this._instance.delete(url, config);
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Axios post request with cheking
     */
    private async _postRequest<T>(url: string, data?: unknown, config?: AxiosRequestConfig) : Promise<T | undefined> {
        if (!this._isLogin)
            return undefined;

        try {
            const response = await this._instance.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Axios patch request with cheking
     */
    private async _patchRequest<T>(url: string, data?: unknown, config?: AxiosRequestConfig) : Promise<T | undefined> {
        if (!this._isLogin)
            return undefined;

        try {
            const response = await this._instance.patch<T>(url, data, config);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * Axios put request with cheking
     */
    private async _putRequest<T>(url: string, data?: unknown, config?: AxiosRequestConfig) : Promise<T | undefined> {
        if (!this._isLogin)
            return undefined;

        try {
            const response = await this._instance.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    // //////////////////////////////////////////////////////////////////////////////
    // AUTH
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To login a user
     * @param username also supports the user email
     */
    async normalLogin(username: string, password: string) : Promise<IUserAuthenticationDetail | undefined> {
        try {
            const response = await this._instance.post<IUserAuthenticationDetail>('/auth', {
                type: 'normal',
                username,
                password
            });
            this._authorize(response.data.auth_token);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * To login a user via GitHub
     * @param code your github authentication code
     */
    async githubLogin(code: string) : Promise<IUserAuthenticationDetail | undefined> {
        try {
            const response = await this._instance.post<IUserAuthenticationDetail>('/auth', {
                type: 'github',
                code
            });
            this._authorize(response.data.auth_token);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * To register a user without invitation
     * @param params: IPublicRegistryParams
     */
    async publicRegistry(params: IPublicRegistryParams) : Promise<IUserAuthenticationDetail | undefined> {
        try {
            const response = await this._instance.post<IUserAuthenticationDetail>('/auth/register', {
                type: 'public',
                accepted_terms: params.accepted_terms,
                email: params.email,
                full_name: params.full_name,
                password: params.password,
                username: params.username
            });
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * To add a user into a project via invitation
     * @param params: IPrivateRegistryParams
     */
    async privateRegistry(params: IPrivateRegistryParams) : Promise<IUserAuthenticationDetail | undefined> {
        try {
            const response = await this._instance.post<IUserAuthenticationDetail>('/auth/register', {
                'type': 'private',
                'accepted_terms': params.accepted_terms,
                'email': params.email,
                'existing': params.existing,
                'full_name': params.full_name,
                'password': params.password,
                'username': params.username
            });
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    // //////////////////////////////////////////////////////////////////////////////
    // APPLICATIONS
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get an application by the application id
     * @param id application id
     */
    async getApplication(id: string) : Promise<IApplication | undefined> {
        return await this._getRequest<IApplication>(`/applications/${id}`);
    }

    /**
     * To get an application token by the application id
     * @param id application id
     */
    async getApplicationToken(applicationId: string) : Promise<IApplicationToken | undefined> {
        return await this._getRequest<IApplicationToken>(`/applications/${applicationId}/token`);
    }

    // //////////////////////////////////////////////////////////////////////////////
    // APPLICATION TOKENS
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get list of all application tokens
     */
    async getApplicationTokenList() : Promise<Array<IApplicationToken> | undefined> {
        return await this._getRequest<Array<IApplicationToken>>('/application-tokens');
    }

    /**
     * To get an application token by the token id
     */
    async getApplicationTokenById(tokenId: string) : Promise<IApplicationToken | undefined> {
        return await this._getRequest<IApplicationToken>(`/application-tokens/${tokenId}`);
    }

    /**
     * To delete an application token by the token id
     * @returns is the application token was deleted
     */
    async deleteApplicationToken(tokenId: string) : Promise<boolean> {
        return await this._deleteRequest(`/application-tokens/${tokenId}`);
    }

    /**
     * To authorize the application
     * @param application the application id for the requested token
     * @param state an unguessable random string for protecting request
     */
    async authorizeApplication(application: string, state: string) : Promise<IAuthorizationCode | undefined> {
        return await this._postRequest<IAuthorizationCode>('/application-tokens/authorize', {
            application,
            state
        });
    }

    /**
     * To validate an authorization code
     * @param application the application id
     * @param authCode the application code got afther authorize
     * @param state an unguessable random string for protecting request
     */
    async validateApplication(application: string, authCode: string, state: string) : Promise<ICypheredToken | undefined> {
        return await this._postRequest<ICypheredToken>('/application-tokens/authorize', {
            application,
            auth_code: authCode,
            state
        });
    }

    // //////////////////////////////////////////////////////////////////////////////
    // RESOLVER
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To resolve the id of a project by the project slug
     */
    async resolveProject(projectSlug: string) : Promise<IProjectResolve | undefined> {
        return await this._getRequest<IProjectResolve>('/resolver', {
            params: {
                project: projectSlug
            }
        });
    }

    /**
     * To resolve the id of a user story by the project and user story slugs
     */
    async resolveUserStory(projectSlug: string, userStorySlug: string) : Promise<IUserStoryResolve | undefined> {
        return await this._getRequest<IUserStoryResolve>('/resolver', {
            params: {
                project: projectSlug,
                us: userStorySlug
            }
        });
    }

    /**
     * To resolve the id of a issue by the project and issue slugs
     */
    async resolveIssue(projectSlug: string, issueSlug: string) : Promise<IIssueResolve | undefined> {
        return await this._getRequest<IIssueResolve>('/resolver', {
            params: {
                issue: issueSlug,
                project: projectSlug
            }
        });
    }

    /**
     * To resolve the id of a task by the project and task slugs
     */
    async resolveTask(projectSlug: string, taskSlug: string) : Promise<ITaskResolve | undefined> {
        return await this._getRequest<ITaskResolve>('/resolver', {
            params: {
                task: taskSlug,
                project: projectSlug
            }
        });
    }

    /**
     * To resolve the id of a milestone by the project and milestone slugs
     */
    async resolveMilestone(projectSlug: string, milestoneSlug: string) : Promise<IMilestoneResolve | undefined> {
        return await this._getRequest<IMilestoneResolve>('/resolver', {
            params: {
                milestone: milestoneSlug,
                project: projectSlug
            }
        });
    }

    /**
     * To resolve the id of a wiki page by the project and wiki page slugs
     */
    async resolveWikiPage(projectSlug: string, wikiPageSlug: string) : Promise<IWikiPageResolve | undefined> {
        return await this._getRequest<IWikiPageResolve>('/resolver', {
            params: {
                project: projectSlug,
                wikipage: wikiPageSlug
            }
        });
    }

    /**
     * To resolve the multiple ids by project, task, user story and wiki page slugs
     */
    async resolveMultipleResolution(projectSlug: string, taskSlug: string, userStorySlug: string, wikiPageSlug: string) : Promise<IMultipleResolve | undefined> {
        return await this._getRequest<IMultipleResolve>('/resolver', {
            params: {
                project: projectSlug,
                task: taskSlug,
                us: userStorySlug,
                wikipage: wikiPageSlug
            }
        });
    }

    /**
     * To resolve an object if we don’t know its type we have to use ref
     */
    async resolveByRefValue(projectSlug: string, ref: string) : Promise<IUserStoryResolve | ITaskResolve | IIssueResolve | undefined> {
        return await this._getRequest<IUserStoryResolve | ITaskResolve | IIssueResolve>('/resolver', {
            params: {
                project: projectSlug,
                ref
            }
        });
    }

    // //////////////////////////////////////////////////////////////////////////////
    // SEARCHES
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To search the text in the project
     * @param project project id
     * @param text text for find
     */
    async search(project: number, text: string) : Promise<ISearchResults | undefined> {
        return await this._getRequest<ISearchResults>('/search', {
            params: {
                project,
                text
            }
        });
    }

    // //////////////////////////////////////////////////////////////////////////////
    // USER STORAGE
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get a list of all user storages
     */
    async getUserStorageList() : Promise<IUserStorage | undefined> {
        return await this._getRequest<IUserStorage>('/user-storage');
    }

    /**
     * To create a user storage by key and value
     */
    async createUserStorage(key: string, value: string) : Promise<IUserStorage | undefined> {
        return await this._postRequest<IUserStorage>('user-storage', {
            key,
            value
        });
    }

    /**
     * To get user storage by key
     */
    async getUserStorage(key: string) : Promise<IUserStorage | undefined> {
        return await this._getRequest<IUserStorage>(`/user-storage/${key}`);
    }

    /**
     * To edit the user storage by key
     */
    async editUserStorage(key: string, value: string) : Promise<IUserStorage | undefined> {
        return await this._patchRequest<IUserStorage>(`/user-storage/${key}`, {
            value
        });
    }

    /**
     * To delete user storage by id
     */
    async deleteUserStorage(key: string) : Promise<boolean> {
        return await this._deleteRequest(`/user-storage/${key}`);
    }

    // //////////////////////////////////////////////////////////////////////////////
    // PROJECT TEMPLATES
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get list of all project templates
     */
    async getProjectTemplateList() : Promise<IProjectTemplateDetails | undefined> {
        return await this._getRequest<IProjectTemplateDetails>('/project-templates');
    }

    /**
     * To create a new project template
     */
    async createProjectTemplate(data: IProjectTemplateDetails) : Promise<IProjectTemplateDetails | undefined> {
        return await this._postRequest<IProjectTemplateDetails>('/project-templates', data);
    }

    /**
     * To get the project template by the id
     */
    async getProjectTemplate(id: number) : Promise<IProjectTemplateDetails | undefined> {
        return await this._getRequest<IProjectTemplateDetails>(`/project-templates/${id}`);
    }

    /**
     * To edit the project template
     */
    async editProjectTemplate(data: IProjectTemplateDetails) : Promise<IProjectTemplateDetails | undefined> {
        return await this._putRequest<IProjectTemplateDetails>(`/project-templates/${data.id}`, data);
    }

    /**
     * To delete the project template by id
     */
    async deleteProjectTemplate(id: number) : Promise<boolean> {
        return await this._deleteRequest(`/project-templates/${id}`);
    }

    // //////////////////////////////////////////////////////////////////////////////
    // PROJECTS
    // //////////////////////////////////////////////////////////////////////////////
}
