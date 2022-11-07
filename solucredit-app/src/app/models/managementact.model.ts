export interface ManagementActPagination{
    count: number,
    managementact: ManagementAct[]
}

export interface GetManagementActResponse{
    success: boolean;
    data: ManagementAct
}

export interface GetManagementActsResponse{
    success: boolean;
    data: ManagementActPagination
}

export interface PostInitManagementAct {
    success: boolean
    data: ManagementAct
}

export class ManagementAct{
    id?: number;
    registry_act1?: string;
    registry_act2?: string;
    year_act?: number;
    address_act?: string;
    id_commercialanalysis?: number;
    id_customer?: number;
    address?: string;
    amount?: number;
    id_doc_warranty?: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id?: number,
        registry_act1?: string,
        registry_act2?: string,
        year_act?: number,
        address_act?: string,
        id_commercialanalysis?: number,
        id_customer?: number,
        address?: string,
        amount?: number,
        id_doc_warranty?: string,
        creation_date?: Date,
        last_mod?: Date
    )
    {
        this.id= id;
        this.registry_act1= registry_act1;
        this.registry_act2= registry_act2;
        this.year_act= year_act;
        this.address_act= address_act;
        this.id_commercialanalysis= id_commercialanalysis;
        this.id_customer= id_customer;
        this.address= address;
        this.amount= amount;
        this.id_doc_warranty= id_doc_warranty;
        this.creation_date= creation_date;
        this.last_mod= last_mod;
    }

}