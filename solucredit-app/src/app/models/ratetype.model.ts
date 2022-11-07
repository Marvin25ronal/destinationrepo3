export interface RateTypePagination {
    count: number,
    ratetype: RateType[]
}
export interface GetRateTypeResponse {
    success: boolean;
    data: RateType
}
export interface GetRateTypesResponse {
    success: boolean;
    data: RateTypePagination
}

export class RateType {
    id_ratetype?: number;
    ratetype_name: string;
    ratetype_description: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_ratetype: number,
        ratetype_name: string,
        ratetype_description: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_ratetype = id_ratetype;
        this.ratetype_name = ratetype_name;
        this.ratetype_description = ratetype_description;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}