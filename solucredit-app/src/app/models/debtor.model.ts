export interface DebtorPagination {
    count: number,
    debtor: Debtor[]
}

export interface GetDebtorsResponse {
    success: boolean;
    data: DebtorPagination;
}
export interface GetDebtorResponse {
    success: boolean;
    data: Debtor;
}

export class Debtor{
    id_debtor?: number;
    business_name: string;
    tradename: string;
    comercial_address: string;
    collection_address: string;
    nit: string;
    phone: string;
    status: number

    constructor(
        id_debtor: number,
        business_name: string,
        tradename: string,
        comercial_address: string,
        collection_address: string,
        nit: string,
        status: number
    ){
        this.id_debtor = id_debtor;
        this.business_name = business_name;
        this.tradename = tradename;
        this.comercial_address = comercial_address;
        this.collection_address = collection_address;
        this.nit = nit;
        this.status = status;

    }
}