export interface AccountTypePagination {
    count: number;
    account_type: AccountType[]
}
export interface GetAccountTypeResponse {
    success: boolean;
    data: AccountType
}
export interface GetAccountTypesResponse {
    success: boolean;
    data: AccountTypePagination
}
export class AccountType {
    id_account?: number;
    account_name: string;
    description: string;
    currency_id: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id: number,
        name: string,
        description: string,
        creation_date: Date,
        last_mod: Date,
        currency_id: number
    ) {
        this.id_account = id;
        this.account_name = name;
        this.description = description
        this.creation_date = creation_date;
        this.last_mod = last_mod;
        this.currency_id = currency_id;
    }
}