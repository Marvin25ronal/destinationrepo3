export interface CommercialAnalysisPagination {
    count: number,
    commercialanalysis: CommercialAnalysis[]
}
export interface GetCAResponse {
    success: boolean;
    data: CommercialAnalysis
}

export interface GetCASResponse {
    success: boolean;
    data: CommercialAnalysisPagination
}

export class CommercialAnalysis {
    id_commercialanalysis?: number;
    id_request?: number;
    id_customer?: number;
    commercialanalysis_comment?: string;
    analysis_status_id?: number;
    analysis_type?: number;
    creation_date?: Date;
    last_mod?: Date;
    valid_documents?: boolean
    customer?: any
    approval_date?: Date
    constructor(
        id_commercialanalysis: number,
        id_request: number,
        id_customer: number,
        analysis_status_id: number,
        analysis_type: number,
        commercialanalysis_comment: string,
        creation_date: Date,
        last_mod: Date,
        valid_documents: boolean,
        customer?: any,
        aproval_date?: Date
    ) {
        this.id_commercialanalysis = id_commercialanalysis;
        this.id_request = id_request;
        this.id_customer = id_customer;
        this.analysis_status_id = analysis_status_id;
        this.analysis_type = analysis_type;
        this.commercialanalysis_comment = commercialanalysis_comment;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
        this.valid_documents = valid_documents;
        this.customer = customer
        this.approval_date = aproval_date
    }
}

export class AnalysisType {
    id_analysistype?: number;
    analysistype_name: string;
    analysistype_desc: string;
    creation_date: Date;
    last_mod: Date;
    constructor(
        id: number,
        name: string,
        desc: string,
        creation: Date,
        last: Date
    ) {
        this.id_analysistype = id
        this.analysistype_name = name
        this.analysistype_desc = desc
        this.creation_date = creation
        this.last_mod = last
    }
}