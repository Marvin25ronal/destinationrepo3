export interface FormsCommercialAnalysisPagination {
    count: number,
    commercialanalysis: FormsCommercialAnalysis[]
}
export interface GetFCAResponse {
    success: boolean;
    data: FormsCommercialAnalysis
}

export interface GetFCASResponse {
    success: boolean;
    data: FormsCommercialAnalysisPagination
}

export class FormsCommercialAnalysis {
    id_formsca?: number;
    id_form?: number;
    id_commercialanalisys?: number;
    formsca_verification?: number;
    formsca_comment?: string;
    formsca_keys3?: string;
    formsca_names3?: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_formsca: number,
        id_form: number,
        id_commercialanalisys: number,
        formsca_verification: number,
        formsca_comment: string,
        formsca_keys3: string,
        formsca_names3: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_formsca = id_formsca;
        this.id_form = id_form;
        this.id_commercialanalisys = id_commercialanalisys;
        this.formsca_verification = formsca_verification;
        this.formsca_comment = formsca_comment;
        this.formsca_keys3 = formsca_keys3;
        this.formsca_names3 = formsca_names3;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}