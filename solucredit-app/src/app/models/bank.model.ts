export interface BanksPagination {
    count: number,
    banks: Banks[]
}
export interface GetBankResponse {
    success: boolean;
    data: Banks
}
export interface GetBanksResponse {
    success: boolean;
    data: BanksPagination
}

export class Banks {
    id_banks?: number;
    banks_name: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_banks: number,
        banks_name: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_banks = id_banks;
        this.banks_name = banks_name;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}