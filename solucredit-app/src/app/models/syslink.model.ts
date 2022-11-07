export interface SysLinkPagination {
    count: number
    data: SysLink[]
}
export interface GetSysLinkResponse{
    success:boolean
    data: SysLinkPagination
}
export class SysLink {
    id?: number
    name: string
    description?: string
    link: string
    constructor(
        id: number,
        name: string,
        description: string,
        link: string
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.link = link
    }
}