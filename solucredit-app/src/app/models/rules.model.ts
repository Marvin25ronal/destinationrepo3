import { RuleType } from "./ruletype";

export interface RulesPagination {
    count: number,
    rules: Rules[]
}
export interface GetRuleResponse {
    success: boolean;
    data: Rules
}
export interface GetRulesResponse {
    success: boolean;
    data: RulesPagination
}

export class Rules {
    id_rule?: number;
    rule_name: string;
    rule_description?: string;
    id_rulet: number;
    creation_date?: Date;
    last_mod?: Date;
    rule_type?:RuleType
    constructor(
        id_rule: number,
        rule_name: string,
        rule_description: string,
        id_rulet: number,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_rule = id_rule;
        this.rule_name = rule_name;
        this.rule_description = rule_description;
        this.id_rulet = id_rulet;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}