export interface IWebhook {
    id: number
    key: string
    logs_counter:number
    name: string
    project: number
    url: string
}

export interface IWebhookLog {
    created: string
    duration: number
    id: number
    request_data: {
        action: string
        by: {
            full_name: string
            gravatar_id: string
            id: number
            permalink: string
            photo: string | null
            username: string
        }
        data: {
            [data: string]: string
        }
        date: string
        type: string
    }
    request_headers: {
        [header: string]: string
    }
    response_data: string
    response_headers: {
        [header: string]: string
    }
    status: number
    url: string
    webhook: number
}
