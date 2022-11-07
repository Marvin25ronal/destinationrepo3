export interface DisbursementPagination {
    count: number,
    disbursement: Disbursement[]
}
export interface GetDisbursementResponse {
    success: boolean;
    data: Disbursement
}
export interface GetDisbursmentsResponse {
    success: boolean;
    data: DisbursementPagination
}

export class Disbursement {
    id_disbursement?: number;
    disbursement_name: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_disbursement: number,
        disbursement_name: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_disbursement = id_disbursement;
        this.disbursement_name = disbursement_name;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}