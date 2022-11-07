export interface GetSuppliersResponse {
    success: boolean;
    data: SuppliersPagination;
}

export interface GetSupplierResponse {
    success: boolean;
    data: Supplier;
}

export interface SuppliersPagination { 
    count: number,
    data: Supplier[]
}



export interface SaveSupplierResponse { 
    success: boolean;
    data: Supplier;
}

export interface SupplierLogMap { 
    id_supplier_log?: number;
    supplier_id?: any;
    action?: number;
    doc?: number;
    fec?: Date;
}


export interface SupplierDocDetailMap { 
    id_supplier_doc_detail: number;
    id_supplier_doc: number;
    name?: string;
    key?: string;
    url?: string;
    typed?: string;
}
export interface SupplierDocMap { 
    id_supplier_doc?: number;
    supplier_id?: any;
    id_supplier_doc_type?:any;
    state: number;
    detail: SupplierDocDetailMap[];
    name?: string;
}

export interface SupplierMap { 
    supplier_id: number;
    ruc: string;//CODIGO DE PROVEEDORES
    name: string;//NOMBRE DE LA EMPRESA
    address: string;//DIRECCION
    phone1: string;// TELEFONO
    phone2: string;
    contact: string;//CONTACTO
    cellphone: string;//CELULAR
    business: string;//GIRO DE NEGOCIO

    type: number;
    status: number;//BITACORA
    fec_creation?: Date;
}
export class Supplier { 

    supplier_id: number;
    ruc: string;//CODIGO DE PROVEEDORES
    name: string;//NOMBRE DE LA EMPRESA
    address: string;//DIRECCION
    phone1: string;// TELEFONO
    phone2: string;
    contact: string;//CONTACTO
    cellphone: string;//CELULAR
    business: string;//GIRO DE NEGOCIO
    
    type: number;
    status: number;//BITACORA
    fec_creation: Date;
    

    /* , , , ,, , ,   */
   
    constructor(
        supplier_id: number,
        ruc: string,//CODIGO DE PROVEEDORES
        name: string,//NOMBRE DE LA EMPRESA
        address: string,//DIRECCION
        phone1: string,// TELEFONO
        phone2: string,
        contact: string,//CONTACTO
        cellphone: string,//CELULAR
        business: string,//GIRO DE NEGOCIO

        type: number,//
        status: number,//BITACORA
        fec_creation: Date
    ) {
        this.supplier_id = supplier_id;
        this.ruc = ruc;
        this.name = name;
        this.address = address;
        this.phone1 = phone1;
        this.phone2 = phone2;
        this.contact = contact;
        this.cellphone = cellphone;
        this.business = business;
        this.status = status;
        this.type = type;
        this.fec_creation = fec_creation;
    }
    
    
}