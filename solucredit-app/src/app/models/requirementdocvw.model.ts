export interface RequirementDocVWPagination {
    count: number,
    requirementdocvw: RequirementDocVW[]
}
export interface GetRequirementDocVWResponse {
    success: boolean;
    data: RequirementDocVW
}

export interface GetRequirementDocVWSResponse {
    success: boolean;
    data: RequirementDocVWPagination
}

export class RequirementDocVW {
    filter(arg0: (e: any) => boolean): any {
      throw new Error('Method not implemented.');
    }
    id_request?: number;
    id_customer?: number;
    filename?: string;
    s3key?: string;
    constructor(
        id_request: number,
        id_customer: number,
        filename: string,
        s3key: string,
    ) {
        this.id_request = id_request;
        this.id_customer = id_customer;
        this.filename = filename;
        this.s3key = s3key;
    }
}