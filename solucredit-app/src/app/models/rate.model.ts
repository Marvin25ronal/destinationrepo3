import { RateType } from "./ratetype.model";
import { Rules } from "./rules.model";

export interface RatePagination {
    count: number,
    rate: Rate[]
}
export interface GetRateResponse {
    success: boolean;
    data: Rate
}
export interface GetRatesResponse {
    success: boolean;
    data: RatePagination
}

export class Rate {
    id_rates?: number;
    id_branchoffice?: number;
    id_rule?: number;
    id_ratet?: number;
    rate_percentage?: number;
    rate_description?: string;
    rate_amount?: number;
    creation_date?: Date;
    last_mod?: Date;
    default_s?: number;
    rule?: Rules
    rate_type?: RateType
    constructor(
        id_rates: number,
        id_branchoffice: number,
        id_rule: number,
        id_ratet: number,
        rate_description: string,
        rate_percentage: number,
        rate_amount: number,
        creation_date: Date,
        last_mod: Date,
        default_s: number,
    ) {
        this.id_rates = id_rates;
        this.id_branchoffice = id_branchoffice;
        this.id_rule = id_rule;
        this.id_ratet = id_ratet;
        this.rate_description = rate_description;
        this.rate_percentage = rate_percentage;
        this.rate_amount = rate_amount;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
        this.default_s = default_s;
    }
}