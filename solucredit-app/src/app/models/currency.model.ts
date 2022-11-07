export interface CurrencyPagination {
    count: number,
    currency: Currency[]
}
export interface GetCurrencyResponse {
    success: boolean;
    data: Currency
}
export interface GetCurrencysResponse {
    success: boolean;
    data: CurrencyPagination
}

export class Currency {
    id_currency?: number;
    currency_name: string;
    code: string;
    symbol: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_currency: number,
        currency_name: string,
        code: string,
        symbol: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_currency = id_currency;
        this.currency_name = currency_name;
        this.code = code;
        this.symbol = symbol;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}