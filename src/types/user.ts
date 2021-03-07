export interface IUserDetail {
    accepted_terms: boolean
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
    max_memberships_private_projects: string | null
    max_memberships_public_projects: string | null
    max_private_projects: string | null
    max_public_projects: string | null
    photo: string | null
    read_new_terms: boolean
    roles: Array<string>
    theme:string
    timezone: string
    total_private_projects: number
    total_public_projects: number
    username: string
    uuid: string
}

export interface IUserStatsDetail {
    roles: Array<string>
    total_num_closed_userstories: number
    total_num_contacts: number
    total_num_projects: number
}
