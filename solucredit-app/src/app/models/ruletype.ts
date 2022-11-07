export interface RuleTypePagination {
    count: number,
    ruletype: RuleType[]
}
export interface GetRuleTypeResponse {
    success: boolean;
    data: RuleType
}
export interface GetRuleTypesResponse {
    success: boolean;
    data: RuleTypePagination
}
export class RuleType {
    id_ruletype?: number;
    ruletype_name?: string;
    ruletype_percentage?: number;
    ruletype_amount?: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_ruletype: number,
        ruletype_name: string,
        ruletype_percentage: number,
        ruletype_amount: number,
        creation_date?: Date,
        last_mod?: Date
    ) {
        this.id_ruletype = id_ruletype;
        this.ruletype_name = ruletype_name;
        this.ruletype_percentage = ruletype_percentage;
        this.ruletype_amount = ruletype_amount;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}