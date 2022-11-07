export interface UploadDocumentsCAPagination {
    count: number,
    uploaddocumentsca: UploadDocumentsCA[]
}
export interface GetUDCAResponse {
    success: boolean;
    data: UploadDocumentsCA
}

export interface GetUDCASResponse {
    success: boolean;
    data: UploadDocumentsCAPagination
}

export class UploadDocumentsCA {
    id_uploaddocsca?: number;
    id_commercialanalisys?: number;
    uploaddocsca_keys3?: string;
    uploaddocsca_namedoc?: string;
    requirementsca_names3?: string;
    uploaddocsca_comment?: string;
    creation_date?: Date;
    last_mod?: Date;
    responsable?: any
    constructor(
        id_uploaddocsca: number,
        id_commercialanalisys: number,
        uploaddocsca_keys3: string,
        uploaddocsca_namedoc: string,
        uploaddocsca_comment: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_uploaddocsca = id_uploaddocsca;
        this.id_commercialanalisys = id_commercialanalisys;
        this.uploaddocsca_keys3 = uploaddocsca_keys3;
        this.uploaddocsca_namedoc = uploaddocsca_namedoc;
        this.uploaddocsca_comment = uploaddocsca_comment;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}