export interface AditionalRevPagination {
    count: number,
    aditionalrevng : AditionalRev[]
}
export interface GetAditionalRevResponse {
    success: boolean;
    data: AditionalRev
}
export interface GetAditionalRevsResponse {
    success: boolean;
    data: AditionalRevPagination
}

export class AditionalRev {
    id_aditionalrev?: number;
    id_commercialanalysis: number;
    aditionalrev_typedoc?: number;
    aditionalrev_comment: string;
    aditionalrev_docname?: string;
    aditionalrev_keys3?: string;
    aditionalrev_names3?: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_aditionalrev: number,
        id_commercialanalysis: number,
        aditionalrev_typedoc: number,
        aditionalrev_comment: string,
        aditionalrev_docname: string,
        aditionalrev_keys3: string,
        aditionalrev_names3: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_aditionalrev = id_aditionalrev;
        this.id_commercialanalysis = id_commercialanalysis;
        this.aditionalrev_typedoc = aditionalrev_typedoc;
        this.aditionalrev_comment = aditionalrev_comment;
        this.aditionalrev_docname = aditionalrev_docname;
        this.aditionalrev_keys3 = aditionalrev_keys3;
        this.aditionalrev_names3 = aditionalrev_names3;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}