import axios from 'axios';

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

export class Client {

    private url: string;

    constructor(url: string) {
        this.url = url;
        return ;
    }

    async getAllWikiPages() : Promise<Array<WikiPage>> {
        const response = await axios.get<Array<WikiPage>>(`${this.url}/api/v1/wiki`);
        return response.data;
    }

    async getWikiPage(id: number) : Promise<WikiPage> {
        const response = await axios.get<WikiPage>(`${this.url}/api/v1/wiki/${id}`);
        return response.data;
    }
}
