
export class ContractType {
    id?: number
    contract_type_name?: string
    creation_date?: Date
    last_mod?: Date
    constructor(
        id?: number,
        contract_type_name?: string,
        creation_date?: Date,
        last_mod?: Date
    ) {
        this.id = id
        this.contract_type_name = contract_type_name
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}
export class DeedDocument {
    id?: number
    analysis_id?: number
    deed_number?: string
    act_number?: string
    deed_signature_date?: Date
    quota_approval_date?: Date
    quota_expiration_date?: Date
    review_date?: Date
    previus_expiration_date?: Date
    quota_validity_period?: number
    notarys_name?: string
    contract_type?: number
    deed_type?: number
    constructor(
        id?: number,
        analysis_id?: number,
        deed_number?: string,
        act_number?: string,
        deed_signature_date?: Date,
        quota_approval_date?: Date,
        quota_expiration_date?: Date,
        review_date?: Date,
        previus_expiration_date?: Date,
        quota_validity_period?: number,
        notarys_name?: string,
        contract_type?: number,
        deed_type?: number
    ) {
        this.id = id;
        this.act_number = act_number
        this.analysis_id = analysis_id
        this.deed_number = deed_number
        this.deed_signature_date = deed_signature_date
        this.quota_approval_date = quota_approval_date
        this.quota_expiration_date = quota_expiration_date
        this.review_date = review_date
        this.previus_expiration_date = previus_expiration_date
        this.quota_validity_period = quota_validity_period
        this.notarys_name = notarys_name
        this.contract_type = contract_type
        this.deed_type = deed_type
    }
}
export class DeedDocumentType {
    id?: number
    deed_type_name?: string
    creation_date?: Date
    last_mod?: Date
    constructor(
        id?: number,
        deed_type_name?: string,
        creation_date?: Date,
        last_mod?: Date
    ) {
        this.id = id
        this.deed_type_name = deed_type_name
        this.creation_date = creation_date
        this.last_mod = last_mod
    }
}
export interface GetDeedDocumentResponse {
    success: boolean
    data: DeedDocument[]
}
export interface GetContractTypeResponse {
    success: boolean
    data: ContractType[]
}
export interface GetDeedDocumentTypeResponse {
    success: boolean
    data: DeedDocumentType[]
}
export interface GetInitDeedDocumentResponse {
    success: boolean
    data: DeedDocument
}