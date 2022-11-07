export interface FormDocVWPagination {
    count: number,
    requirementdocvw: FormDocVW[]
}
export interface GetFormDocVWResponse {
    success: boolean;
    data: FormDocVW
}

export interface GetFormDocsVWResponse {
    success: boolean;
    data: FormDocVWPagination
}

export class FormDocVW {
    filter(arg0: (e: any) => boolean): any {
      throw new Error('Method not implemented.');
    }
    id_commercialanalysis?: number;
    id_request?: number;
    id_customer?: number;
    filename?: string;
    s3key?: string;
    constructor(
        id_commercialanalysis: number,
        id_request: number,
        id_customer: number,
        filename: string,
        s3key: string,
    ) {
        this.id_commercialanalysis = id_commercialanalysis;
        this.id_request = id_request;
        this.id_customer = id_customer;
        this.filename = filename;
        this.s3key = s3key;
    }
}