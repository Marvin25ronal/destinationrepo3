export class FInsurance {
    insurance_id?: number;
    form_id?: number;
    risk_type?: number;
    insured?: string;
    insurance_company?: string;
    insurance_person?: string;
    policy_expiration?: string;
    insurance_manager?: string;
    other?: string;
   

    constructor(
        insurance_id: number,
        form_id: number,
        risk_type: number,
        insured: string,
        insurance_company: string,
        insurance_person: string,
        policy_expiration: string,
        insurance_manager: string,
        other: string) {

        this.insurance_id = insurance_id;
        this.form_id = form_id;
        this.risk_type = risk_type;
        this.insured = insured;
        this.insurance_company = insurance_company;
        this.insurance_person = insurance_person;
        this.policy_expiration = policy_expiration;
        this.insurance_manager = insurance_manager;
        this.other = other;
    }
}