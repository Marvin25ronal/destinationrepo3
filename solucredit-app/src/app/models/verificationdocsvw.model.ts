export interface VerificationDocsVWPagination {
    count: number,
    verificationdoc: VerificationDocVW[]
}
export interface GetVerificationDocVWResponse {
    success: boolean;
    data: VerificationDocVW
}

export interface GetVerificationDocsVWResponse {
    success: boolean;
    data: VerificationDocsVWPagination
}

export class VerificationDocVW {
    id_commercialanalysis?: number;
    id_request?: number;
    id_checklist?: number;
    id_customer?: number;
    filename?: string;
    nombre?: string;
    s3key?: string;
    id?: number;
    type?: string;
    comment?: string;
    doc_type?: string;
    verification?: number;
    ad_filename?: string;
    ad_s3key?: string;
    bit_value?: string;
    constructor(
        id_commercialanalysis: number,
        id_request: number,
        id_checklist: number,
        id_customer: number,
        nombre: string,
        filename: string,
        s3key: string,
        doc_type: string,
        id: number,
        type: string,
        comment: string,
        verification: number,
        ad_filename: string,
        ad_s3key: string,
        bit_value: string
    ) {
        this.id_commercialanalysis = id_commercialanalysis;
        this.id_request = id_request;
        this.id_checklist = id_checklist;
        this.nombre = nombre;
        this.id_customer = id_customer;
        this.filename = filename;
        this.s3key = s3key;
        this.doc_type = doc_type;
        this.id = id;
        this.type = type;
        this.comment = comment;
        this.verification = verification;
        this.ad_filename = ad_filename;
        this.ad_s3key = ad_s3key;
        this.bit_value = bit_value
    }
}