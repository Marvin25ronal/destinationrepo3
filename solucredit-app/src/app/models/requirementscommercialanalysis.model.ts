export interface RequirementsCommercialAnalysysPagination {
    count: number,
    commercialanalysis: RequirementsCommercialAnalysis[]
}
export interface GetRCAResponse {
    success: boolean;
    data: RequirementsCommercialAnalysis
}

export interface GetRCASResponse {
    success: boolean;
    data: RequirementsCommercialAnalysysPagination
}

export class RequirementsCommercialAnalysis {
    id_requirementsca?: number;
    id_doc?: number;
    id_commercialanalisys?: number;
    requirementsca_verification?: number;
    requirementsca_comment?: string;
    requirementsca_keys3?: string;
    requirementsca_names3?: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_requirementsca: number,
        id_doc: number,
        id_commercialanalisys: number,
        requirementsca_verification: number,
        requirementsca_comment: string,
        requirementsca_keys3: string,
        requirementsca_names3: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_requirementsca = id_requirementsca;
        this.id_doc = id_doc;
        this.id_commercialanalisys = id_commercialanalisys;
        this.requirementsca_verification = requirementsca_verification;
        this.requirementsca_comment = requirementsca_comment;
        this.requirementsca_keys3 = requirementsca_keys3;
        this.requirementsca_names3 = requirementsca_names3;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}