export interface AdviserTypePagination {
    count: number;
    adviser_type: AdviserType[]
}

export interface GetAdviserTypeResponse {
    success: boolean;
    data: AdviserType
}
export interface GetAdviserTypesResponse {
    success: boolean;
    data: AdviserTypePagination
}
export class AdviserType {
    id_adviser_type?: number;
    adviser_type: string;
    description: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id: number,
        name: string,
        description: string,
        creation_date: Date,
        last_mod: Date,

    ) {
        this.id_adviser_type = id
        this.adviser_type = name
        this.description = description
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}