export interface IWikiPageDetail {
    content: string
    created_string: string
    editions: number
    html: string
    id: number
    is_watcher: boolean
    last_modifier: number
    modified_string: string
    owner: number
    project: number
    project_extra_info: {
        id: number
        logo_small_url: string | null
        name: string
        slug: string
    }
    slug: string
    total_watchers: number
    version: number
}
