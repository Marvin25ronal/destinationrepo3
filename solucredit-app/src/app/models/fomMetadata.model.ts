export interface formMetadataResponse {
    success: boolean,
    data: MyProfileReqSubjectResp[]
}
export interface formSubjectModResponse {
    success: boolean,
    data: ReqSubjectResp
}

export interface ReqRequirementDoc {
    req_requi_doc?: number;
    req_requi_det_id?: number;
    name?: string;
    key?: string;
    is_visible?: number;
    url?: string;
    typed?: string;
}
export interface ReqRequirementDetail {
    req_requi_det_id?: number;
    req_requi_id?: number;
    enabled?: number;
    state?: number;
    sys_w_req_element_id?: number;
    docs?: ReqRequirementDoc[];
    req_name?: string;
    req_type?: number;
}
export interface ReqRequirement {
    req_requi_id?: number;
    rwedet_id?: number;
    sys_w_requirements_id?: number;
    requirements?: ReqRequirementDetail[];
    state?: number;
    update_date?:Date;
}
export interface ReqFormDocResp {
    req_form_doc_id?: number;
    rsfdet_id?: number;
    name_s3?: string;
    key?: string;
    is_visible?: number;
    url?: string;
    typed?: string;
}
export interface ReqFormResp {
    rsfdet_id?: number;
    rsdet_id?: number;
    sys_form_id?: number;
    state?: number;
    docs?: ReqFormDocResp[];
    check_status?: number;
    name?: string;//TENGO QUE IR A TRAER EL NOMRE SEGUN EL sys_form_id
}
export interface ReqSubjectResp {
    rsdet_id?: number;
    rwedet_id: number;
    sys_subject_id?: number;
    subject_name?: string;
    name?: string;
    phone?: string;
    email?: string;
    nit?: string;
    dpi?: string;
    forms?: ReqFormResp[];
    crd_id?: number;
    form_id?: number;
    complete_status?: number;
    color?: string;
    lastmod?: Date;
    status?: number;
    owner?:ReqSubjectResp;
    requirements_update_date?:Date;
}
export interface MyProfileReqSubjectResp {
    rwedet_id?: number;
    request_id?: number;
    sys_w_element_id?: number;
    name?: string;
    subjects?: ReqSubjectResp[];
    requirements?: ReqRequirement
}


/* export class formMetadatav2 {
    idPerson: number;
    personName: string;
    businessName: string;
    type: number;
    idForm: number;
    isTrustee: number
    status: number;
    lastmod: Date;

    constructor(
        idPerson: number,
        personName: string,
        businessName: string,
        type: number,
        idForm: number,
        isTrustee: number,
        status: number,
        lastmod: Date) {

       
        this.idPerson = idPerson;
        this.personName = personName;
        this.businessName = businessName;
        this.type = type;
        this.idForm = idForm;
        this.isTrustee = isTrustee;
        this.status = status;
        this.lastmod = lastmod;
    }
}
 */
export interface formStatus {
    id_form: number;
    name: string;
    creation_date: Date;
    last_mod: Date;
    finish_date: Date;
}


export class formMetadata {
    /* id_form: number; */
    id_request: number;
    numberForm: number
    name: string;
    status: number;
    lastMod: string;

    constructor(
        /* id_form: number, */
        id_request: number,
        numberForm: number,
        name: string,
        status: number,
        lastMod: string,) {

        /* this.id_form = id_form; */
        this.id_request = id_request;
        this.numberForm = numberForm;
        this.name = name;
        this.status = status;
        this.lastMod = lastMod;
    }
}

