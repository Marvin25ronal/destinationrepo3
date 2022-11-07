export interface DocWarrantyPagination {
    count: number,
    doc_warranty: DocWarranty[]
}

export interface GetDocWarrantyResponse {
    success: boolean,
    data: DocWarranty
}
export interface GetDocWarrantysResponse {
    success: boolean,
    data: DocWarrantyPagination
}

export class DocWarranty {
    id_doc_warranty?: number;
    doc_warranty: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id: number,
        name: string,
        creation_date: Date,
        last_mod: Date,
    ) {
        this.id_doc_warranty = id
        this.doc_warranty = name
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}