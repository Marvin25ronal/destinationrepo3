export interface CheckListCommercialAnalysysPagination {
    count: number,
    commercialanalysis: CheckListCommercialAnalysis[]
}
export interface GetCheckListResponse {
    success: boolean;
    data: CheckListCommercialAnalysis
}

export interface GetCheckListsResponse {
    success: boolean;
    data: CheckListCommercialAnalysysPagination
}

export class CheckListCommercialAnalysis {
    id_checklist?: number;
    id_doc?: number;
    id_commercialanalysis?: number;
    checklist_typedoc?: number;
    checklist_docname?: string;
    checklist_verification?: number;
    checklist_comment?: string;
    checklist_keys3?: string;
    bit_value?: string;
    checklist_names3?: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_checklist: number,
        id_doc: number,
        id_commercialanalysis: number,
        checklist_typedoc: number,
        checklist_docname: string,
        checklist_verification: number,
        checklist_comment: string,
        checklist_keys3: string,
        checklist_names3: string,
        bit_value: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_checklist = id_checklist;
        this.id_doc = id_doc;
        this.id_commercialanalysis = id_commercialanalysis;
        this.checklist_typedoc = checklist_typedoc;
        this.checklist_verification = checklist_verification;
        this.checklist_docname = checklist_docname;
        this.checklist_comment = checklist_comment;
        this.checklist_keys3 = checklist_keys3;
        this.checklist_names3 = checklist_names3;
        this.bit_value = bit_value;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}