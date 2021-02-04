import { IPrivateRegistryParams, IPublicRegistryParams, IUserAuthenticationDetail, IApplication, IApplicationToken } from './types';
import axios, { AxiosInstance } from 'axios';

export class TaigaClient {
    private _url: string;
    private _instance: AxiosInstance;
    private _isLogin = false;

    /**
     * Create a TaigaClient
     * @param url taiga sever url
     * @param isDisablePagination is disable pagination in all queries
     * @param languageId the LanguageId can be chosen from the value list of available languages.
     */
    constructor(url = 'localhost', isDisablePagination = true, languageId = 'en') {
        this._url = url + '/api/v1';
        this._instance = axios.create({
            baseURL: this._url,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'x-disable-pagination': `${isDisablePagination ? 'True' : 'False'}`,
                'Accept-Language': languageId
            }
        });
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
            this._isLogin = true;
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
            this._isLogin = true;
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
     * To get an application
     * @param id application id
     */
    async getApplication(id: string) : Promise<IApplication | undefined> {
        if (!this._isLogin)
            return undefined;

        try {
            const response = await this._instance.get<IApplication>(`/applications/${id}`);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    /**
     * To get an application token
     * @param id application id
     */
    async getApplicationToken(id: string) : Promise<IApplicationToken | undefined> {
        if (!this._isLogin)
            return undefined;

        try {
            const response = await this._instance.get<IApplicationToken>(`/applications/${id}/token`);
            return response.data;
        } catch (error) {
            return undefined;
        }
    }

    // //////////////////////////////////////////////////////////////////////////////
    // APPLICATION TOKENS
    // //////////////////////////////////////////////////////////////////////////////
}
