export interface IApplication {
    description: string
    icon_url: string | null
    id: string
    name: string
    web: string
}

export interface IApplicationToken {
    application: IApplication
    auth_code: string
    id: number
    next_url: string
    user: number
}
