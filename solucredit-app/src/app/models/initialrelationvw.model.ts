export interface InitialRelationDocVWPagination {
    count: number,
    initialrelationdocvw: InitialRelationDocVW[]
}
export interface GetInitialRelationDocVWResponse {
    success: boolean;
    data: InitialRelationDocVW
}

export interface GetInitialRelationDocsVWResponse {
    success: boolean;
    data: InitialRelationDocVWPagination
}

export class InitialRelationDocVW {
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