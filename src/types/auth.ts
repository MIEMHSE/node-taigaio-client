export interface IUserAuthenticationDetail {
    accepted_terms: boolean
    auth_token: string
    big_photo: string | null
    bio: string
    color: string
    date_joined: string
    email: string
    full_name: string
    full_name_display: string
    gravatar_id: string
    id: number
    is_active: boolean
    lang: string
    max_memberships_private_projects: number | null
    max_memberships_public_projects: number | null
    max_private_projects: number | null
    max_public_projects: number | null
    photo: string | null
    read_new_terms: boolean
    roles: Array<string>
    theme: string
    timezone: string
    total_private_projects: number
    total_public_projects: number
    username: string
    uuid: string
}

export interface IPublicRegistryParams {
    username: string
    password: string
    email: string
    full_name: string
    accepted_terms: boolean
}

export interface IPrivateRegistryParams extends IPublicRegistryParams {
    /**
     *  indicates if the user is member or not
     */
    existing: boolean
}

export interface IAuthorizationCode {
    auth_code: string
    next_url: string
    state: string
}

export interface ICypheredToken {
    token: string
}
