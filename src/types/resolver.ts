export interface IProjectResolve {
    project: number
}

export interface IUserStoryResolve {
    project: number
    us: number
}

export interface IIssueResolve {
    issue: number
    project: number
}

export interface ITaskResolve {
    task: number
    project: number
}

export interface IMilestoneResolve {
    milestone: number
    project: number
}

export interface IWikiPageResolve {
    project: number
    wikipage: number
}

export interface IMultipleResolve {
    project: number
    task: number
    us: number
    wikipage: number
}
