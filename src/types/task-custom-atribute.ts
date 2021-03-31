export interface ITaskCustomAtributeDetail {
    created_date: string
    description: string
    extra: string | null
    id: number
    modified_date: string
    name: string
    order: number
    project: number
    type: string
}

export interface ITaskCustomAtributeValueDetail {
    attributes_values: {[name: string] : string}
    task: number
    version: number
}
