export interface ISearchEpic {
    assigned_to: number
    id: number
    ref: number
    status: number
    subject: string
}

export interface ISearchIssue {
    assigned_to: number
    id: number
    ref: number
    status: number
    subject: string
}

export interface ISearchTask {
    assigned_to: number
    id: number
    ref: number
    status: number
    subject: string
}

export interface ISearchUserStory {
    id: number
    milestone_name: string | null
    milestone_slug: string | null
    ref: number
    status: number
    subject: string
    total_points: number
}

export interface ISearchWikiPage {
    id: number
    slug: string
}

export interface ISearchResults {
    count: number
    epics: Array<ISearchEpic>
    issues: Array<ISearchIssue>
    tasks: Array<ISearchTask>
    userstories: Array<ISearchUserStory>
    wikipages: Array<ISearchWikiPage>
}
