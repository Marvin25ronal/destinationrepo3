export interface AnalysisCheckPagination{
    count: number,
    analysischeck: AnalysisCheck
}

export interface getAnalysisCheck{
    success: boolean;
    data: AnalysisCheck
}

export class AnalysisCheck {
    id_check?: number;
    id_checktype?: number;
    id_request?: number;
    id_commercialanalysis?: number;
    check_name?: string;
    check_s3key?: string;
    check_filename?: string;
    check_verification?: number;
    creation_date?: Date;
    last_mod?: Date
    constructor(
        id_check: number,
        id_checktype: number,
        id_request: number,
        id_commercialanalysis: number,
        check_name: string,
        check_s3key: string,
        check_filename: string,
        check_verification: number,
        creation_date: Date,
        last_mod: Date,
    )
    {
        this.id_check = id_check;
        this.id_checktype = id_checktype;
        this.id_request = id_request;
        this.id_commercialanalysis = id_commercialanalysis;
        this.check_name = check_name;
        this.check_s3key = check_s3key;
        this.check_filename = check_filename;
        this.check_verification = check_verification;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}