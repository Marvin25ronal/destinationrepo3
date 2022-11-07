export interface RequestTypePagination {
    count: number,
    request_type: RequestType[]
}

export interface GetRequestTypeResponse {
    success: boolean;
    data: RequestType
}

export interface GetRequestTypesResponse {
    success: boolean;
    data: RequestTypePagination
}

export class RequestType {
    type_id?: number;
    name: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_coverage: number,
        coverage_name: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.type_id = id_coverage;
        this.name = coverage_name;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}