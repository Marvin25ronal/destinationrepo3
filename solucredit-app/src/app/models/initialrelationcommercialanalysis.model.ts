export interface InitialRelationCommercialAnalysysPagination {
    count: number,
    commercialanalysis: InitialRelationCommercialAnalysis[]
}
export interface GetIRCAResponse {
    success: boolean;
    data: InitialRelationCommercialAnalysis
}

export interface GetIRCASResponse {
    success: boolean;
    data: InitialRelationCommercialAnalysysPagination
}

export class InitialRelationCommercialAnalysis {
    id_initialrca?: number;
    id_doc?: number;
    id_commercialanalisys?: number;
    initialrca_verification?: number;
    initialrca_comment?: string;
    initialrca_keys3?: string;
    initialrca_names3?: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_initialrca: number,
        id_doc: number,
        id_commercialanalisys: number,
        initialrca_verification: number,
        initialrca_comment: string,
        initialrca_keys3: string,
        initialrca_names3: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_initialrca = id_initialrca;
        this.id_doc = id_doc;
        this.id_commercialanalisys = id_commercialanalisys;
        this.initialrca_verification = initialrca_verification;
        this.initialrca_comment = initialrca_comment;
        this.initialrca_keys3 = initialrca_keys3;
        this.initialrca_names3 = initialrca_names3;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}