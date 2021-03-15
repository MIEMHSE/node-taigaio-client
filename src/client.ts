import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import {
    IApplication,
    IApplicationToken,
    IAuthorizationCode,
    IBulkUpdateOrderProject,
    ICypheredToken,
    IIssueResolve,
    IMilestoneResolve,
    IMultipleResolve,
    IPrivateRegistryParams,
    IProjectCreateParams,
    IProjectDetail,
    IProjectFilter,
    IProjectIssueStatsDetail,
    IProjectListEntry,
    IProjectModulesConfiguration,
    IProjectResolve,
    IProjectStatsDetail,
    IProjectTagColors,
    IProjectTemplateDetails,
    IProjectVoter,
    IProjectWatcher,
    IPublicRegistryParams,
    ISearchResults,
    ITaskCustomAtributeDetail,
    ITaskDetail,
    ITaskFiltersDataDetail,
    ITaskResolve,
    IUserAuthenticationDetail,
    IUserDetail,
    IUserStatsDetail,
    IUserStorage,
    IUserStoryResolve,
    IWikiLinkDetail,
    IWikiPageDetail,
    IWikiPageResolve,
    IHistoryEntry,
    HistoryPageT,
    IWebhook,
    IWebhookLog
} from './types';

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
    constructor(url = 'localhost:8000', authToken?: string, isDisablePagination = true, languageId = 'en') {
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

    /**
     * To get a list of all projects
     * @param projectFilter to filter the list
     */
    async getProjectList(projectFilter?: IProjectFilter) : Promise<Array<IProjectListEntry> | undefined> {
        return await this._getRequest<Array<IProjectListEntry>>('/projects', {
            params: projectFilter
        });
    }

    /**
     * To create a project by the data
     */
    async createProject(data: IProjectCreateParams) : Promise<IProjectDetail | undefined> {
        return await this._postRequest<IProjectDetail>('projects', data);
    }

    /**
     * To get a project by id
    */
    async getProject(projectId: number) : Promise<IProjectDetail | undefined> {
        return await this._getRequest<IProjectDetail>(`/projects/${projectId}`);
    }

    /**
     * To get a project by the slug
     */
    async getProjectBySlug(projectSlug: string) : Promise<IProjectDetail | undefined> {
        return await this._getRequest<IProjectDetail>('/projects/by_slug', {
            params: {
                slug: projectSlug
            }
        });
    }

    /**
     * To edit the projet by the data
     */
    async editProject(projectId: number, data: IProjectCreateParams) : Promise<IProjectDetail | undefined> {
        return await this._putRequest<IProjectDetail>(`/projects/${projectId}`, data);
    }

    /**
     * To delete the project by id
     */
    async deleteProject(projectId: number) : Promise<boolean> {
        return await this._deleteRequest(`/projects/${projectId}`);
    }

    /**
     * To update the projects order
     */
    async bulkUpdateOderProjects(data: Array<IBulkUpdateOrderProject>) : Promise<boolean> {
        return (await this._postRequest('/projects/bulk_update_order', data)) ? true : false;
    }

    /**
     * To get a project modules configuration by project id
     */
    async getModulesConfiguration(projectId: number) : Promise<IProjectModulesConfiguration | undefined> {
        return await this._getRequest<IProjectModulesConfiguration>(`/projects/${projectId}/modules`);
    }

    /**
     * To edit a project modules configuration by project id
     */
    async editModulesConfiguration(projectId: number, data: IProjectModulesConfiguration) : Promise<boolean> {
        return (await this._patchRequest(`/projects/${projectId}/modules`, data)) ? true : false;
    }

    /**
     * To get the project stats by project id
     */
    async getProjectStats(projectId: number) : Promise<IProjectStatsDetail | undefined> {
        return await this._getRequest<IProjectStatsDetail>(`/projects/${projectId}/stats`);
    }

    /**
     * To get a project issue stats by project id
     */
    async getProjectIssueStats(projectId: number) : Promise<IProjectIssueStatsDetail | undefined> {
        return await this._getRequest<IProjectIssueStatsDetail>(`/projects/${projectId}/issues_stats`);
    }

    /**
     * To get a project tag colors
     */
    async getProjectTagColorsStats(projectId: number) : Promise<IProjectTagColors | undefined> {
        return await this._getRequest<IProjectTagColors>(`/projects/${projectId}/tags_colors`);
    }

    /**
     * To create  a project tag color
     */
    async createProjectTagColor(projectId: number, tag: string, color: string) : Promise<boolean> {
        return (await this._postRequest(`/projects/${projectId}/create_tag`, {
            color,
            tag
        })) ? true : false;
    }

    /**
     * To edit  a project tag color
     */
    async editProjectTag(projectId: number, fromTag: string, toTag: string, color: string) : Promise<boolean> {
        return (await this._postRequest(`/projects/${projectId}/edit_tag`, {
            color,
            from_tag: fromTag,
            to_tag: toTag
        })) ? true : false;
    }

    /**
     * To delete  a project tag color
     */
    async deleteProjectTagColor(projectId: number, tag: string) : Promise<boolean> {
        return (await this._postRequest(`/projects/${projectId}/delete_tag`, {
            tag
        })) ? true : false;
    }

    /**
     * To mix  project tags color
     */
    async mixPorjectTagsColors(projectId: number, fromTags: Array<string>, toTag: string) : Promise<boolean> {
        return (await this._postRequest(`/projects/${projectId}/mix_tags`, {
            from_tags: fromTags,
            to_tag: toTag
        })) ? true : false;
    }

    /**
     * To like the project
     */
    async likeProject(projectId: number) : Promise<boolean> {
        return (await this._postRequest(`/projects/${projectId}/like`)) ? true : false;
    }

    /**
     * To unlike the project
     */
    async unlikeProject(projectId: number) : Promise<boolean> {
        return (await this._postRequest(`/projects/${projectId}/unlike`)) ? true : false;
    }

    /**
     * To get the list of fans from the project
     */
    async getProjectFansList(projectId: number): Promise<Array<IProjectVoter> | undefined> {
        return await this._getRequest<Array<IProjectVoter>>(`/projects/${projectId}/fans`);
    }

    /**
     * To watch the project
     */
    async watchProject(projectId: number) : Promise<boolean> {
        return (await this._postRequest(`/projects/${projectId}/watch`)) ? true : false;
    }

    /**
     * To unwatch the project
     */
    async unwatchProject(projectId: number) : Promise<boolean> {
        return (await this._postRequest(`/projects/${projectId}/unwatch`)) ? true : false;
    }

    /**
     * To get the list of wathers from the project
     */
    async getProjectWathersList(projectId: number): Promise<Array<IProjectWatcher> | undefined> {
        return await this._getRequest<Array<IProjectWatcher>>(`/projects/${projectId}/watchers`);
    }

    /**
     * To create a template from the selected project
     * @param name template name
     * @param description template description
     */
    async createProjectTemplateFromProject(projectId: number, name: string, description: string) : Promise<IProjectTemplateDetails | undefined> {
        return await this._postRequest(`/projects/${projectId}/create_template`, {
            template_description: description,
            template_name: name
        });
    }

    /**
     * To leave the project
     */
    async leaveProject(projectId: number) : Promise<boolean> {
        return (await this._postRequest(`/projects/${projectId}/leave`)) ? true : false;
    }

    // //////////////////////////////////////////////////////////////////////////////
    // TASKS
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get list of tasks
     * @param taskFilter to filter the list
     */
    async getTaskList(taskFilter: ITaskFiltersDataDetail) : Promise<Array<ITaskDetail> | undefined> {
        return await this._getRequest<Array<ITaskDetail> >('/tasks', {
            params: taskFilter
        });
    }

    // //////////////////////////////////////////////////////////////////////////////
    // TASK CUSTOM ATTRIBUTE
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get list of task custom atributes
     */
    async getTaskCustomAtributeList(projectId?: number) : Promise<Array<ITaskCustomAtributeDetail> | undefined> {
        if (projectId) {
            return await this._getRequest<Array<ITaskCustomAtributeDetail> >('/task-custom-attributes', {
                params: {
                    project: projectId
                }
            });
        }
        return await this._getRequest<Array<ITaskCustomAtributeDetail> >('/task-custom-attributes');
    }

    // //////////////////////////////////////////////////////////////////////////////
    // TASK CUSTOM ATTRIBUTES VALUES
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get a task custom attribute
     * @param id task custom atribute id
     */
    async getTaskCustomAtributeValue(id: number) : Promise<ITaskCustomAtributeDetail | undefined> {
        return await this._getRequest<ITaskCustomAtributeDetail>(`/task-custom-attributes/${id}`);
    }

    // //////////////////////////////////////////////////////////////////////////////
    // WIKI PAGES
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get list wiki pages
     */
    async getWikiPageList(projectId?: number) : Promise<Array<IWikiPageDetail> | undefined> {
        if (projectId) {
            return await this._getRequest<Array<IWikiPageDetail>>('/wiki', {
                params: {
                    project: projectId
                }
            });
        }
        return await this._getRequest<Array<IWikiPageDetail>>('/wiki');
    }

    /**
     * To get the wiki page
     * @param id wiki page id
     */
    async getWikiPage(id: number) : Promise<IWikiPageDetail | undefined> {
        return await this._getRequest<IWikiPageDetail>(`/wiki/${id}`);
    }

    // //////////////////////////////////////////////////////////////////////////////
    // WIKI LINKS
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get list wiki links
     */
    async getWikiLinkList(projectId?: number) : Promise<Array<IWikiLinkDetail> | undefined> {
        if (projectId) {
            return await this._getRequest<Array<IWikiLinkDetail>>('/wiki-links', {
                params: {
                    project: projectId
                }
            });
        }
        return await this._getRequest<Array<IWikiLinkDetail>>('/wiki-links');
    }

    /**
     * To get the wiki link
     * @param id wiki link id
     */
    async getWikiLink(id: number) : Promise<IWikiLinkDetail | undefined> {
        return await this._getRequest<IWikiLinkDetail>(`/wiki-links/${id}`);
    }

    // //////////////////////////////////////////////////////////////////////////////
    // HISTORY
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get the history of a user story, task, issue or wiki page
     * @param pageType history of a user story, task, issue or wiki page
     * @param id the url id
     */
    async getHistory(pageType: HistoryPageT, id: number) : Promise<Array<IHistoryEntry> | undefined> {
        return await this._getRequest<Array<IHistoryEntry>>(`/history/${pageType}/${id}`);
    }

    // //////////////////////////////////////////////////////////////////////////////
    // USERS
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get list of users
     */
    async getUserList(projectId?: number) : Promise<Array<IUserDetail> | undefined> {
        if (projectId) {
            return await this._getRequest<Array<IUserDetail>>('/users', {
                params: {
                    project: projectId
                }
            });
        }
        return await this._getRequest<Array<IUserDetail>>('/users');
    }

    /**
     * To get user by the user id
     * @param id user id
     */
    async getUser(id: number) : Promise<IUserDetail | undefined> {
        return await this._getRequest<IUserDetail>(`/users/${id}`);
    }

    /**
     * To get your own user
     */
    async getMe(): Promise<IUserDetail | undefined> {
        return await this._getRequest<IUserDetail>('/users/me');
    }

    /**
     * To get user stats
     * @param id user id
     */
    async getUserStats(id: number) : Promise<IUserStatsDetail | undefined> {
        return await this._getRequest<IUserStatsDetail>(`/users/${id}/stats`);
    }

    // //////////////////////////////////////////////////////////////////////////////
    // WEBHOOKS
    // //////////////////////////////////////////////////////////////////////////////

    /**
     * To get list of webhooks
     */
    async getWebhookList(projectId?: number) : Promise<Array<IWebhook> | undefined> {
        if (projectId) {
            return await this._getRequest<Array<IWebhook>>('/webhooks', {
                params: {
                    project: projectId
                }
            });
        }
        return await this._getRequest<Array<IWebhook>>('/webhooks');
    }

    /**
     * To create a webhook
     * @param url payload url
     * @param key secret key
     */
    async createWebhook(projectId: number, name: string, url: string, key: string) : Promise<IWebhook | undefined> {
        return await this._postRequest<IWebhook>('/webhooks', {
            key,
            name,
            project: projectId,
            url
        });
    }

    /**
     * To get the webhook by the id
     * @param id webhook id
     */
    async getWebhook(id: number) : Promise<IWebhook | undefined> {
        return await this._getRequest(`/webhooks/${id}`);
    }

    /**
     * To edit the webhook
     * @param id webhook id
     */
    async editWebhook(id: number, projectId?: number, name?: string, url?: string, key?: string) : Promise<IWebhook | undefined> {
        return await this._patchRequest(`/webhooks/${id}`, {
            key,
            name,
            project: projectId,
            url
        });
    }

    /**
     * To delete the webhook
     * @param id webhook id
     */
    async deleteWebhook(id: number) : Promise<boolean> {
        return await this._deleteRequest(`/webhooks/${id}`);
    }

    /**
     * To test a webhook
     * @param id webhook id
     */
    async testWebhook(id: number) : Promise<IWebhookLog | undefined> {
        return await this._postRequest(`/webhooks/${id}/test`);
    }

    /**
     * To get webhook logs list
     * @param id webhook id
     */
    async getLogList(id?: number) : Promise<Array<IWebhookLog> | undefined> {
        if (id) {
            return await this._getRequest<Array<IWebhookLog>>('/webhooklogs', {
                params: {
                    webhook: id
                }
            });
        }
        return await this._getRequest<Array<IWebhookLog>>('/webhooklogs');
    }

    /**
     * To get webhook log
     * @param id webhook log id
     */
    async getLog(id: number) : Promise<IWebhookLog | undefined> {
        return await this._getRequest<IWebhookLog>(`/webhooklogs/${id}`);
    }

    /**
     * To resend a request from a webhook log
     * @param id webhook log id
     */
    async resendWebhookLogRequest(id: number) : Promise<IWebhookLog | undefined> {
        return await this._postRequest<IWebhookLog>(`/webhooklogs/${id}/resend`);
    }
}
