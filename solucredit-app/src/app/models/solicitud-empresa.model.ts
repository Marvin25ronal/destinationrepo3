export interface SaveFormResponse{
    success: boolean;
    data: Form;
}

export interface AplicationFormClient {
    client_id?: number;
    application_form_id?: number;
    name: string;
    monthly_average: number;
    credit_days: number;
    pay_form: string;
    relation_time: number;
    product_service: string;
    contact: string;
    phone: string;
}

export interface AplicationFormCompany {
    company_id?: number;
    application_form_id?: number;
    name: string;
    business: string;
    holding_name: string;
}

export interface AplicationFormBankLoan {
    loan_id?: number;
    application_form_id?: number;
    bank: string;
    loan_number: string;
    warranty: string;
    amount_awarded: number;
    time: number;
    balance: number;
}

export interface AplicationFormBankAccount {
    account_id?: number;
    application_form_id?: number;
    bank: string;
    account_number: string;
    account_type: string;
    currency: string;
    name_account: string;
    monthly_average_deposit: number;
}

export interface AplicationFormFactoring {
    factoring_id?: number;
    application_form_id?: number;
    entity: string;
    warranty: string;
    amount_awarded: number;
    amount_used: number;
    balance: number;

}

export interface AplicationFormSupplier {
    supplier_id?: number;
    application_form_id?: number;
    name: string;
    average_monthly_purchase: number;
    max_credit: number;
    country_id: number;
    contact: string;
    phone: string;
}

export interface AplicationFormLegalRepresentative {
    representative_id?: number;
    application_form_id?: number;
    name: string;
    phone: string;
    nit: string;
    address: string;
    date_of_birth: Date;
    profession: string;
    dpi_num: string;
    dpi_extended: string;
    nationality: string;
    civil_status: number;
    position: string;
    validity: string;
}

export interface AplicationFormMember {
    member_id: number;
    application_form_id: number;
    name: string;
    postion: string;
    nationality: string;
    nit: string;
    share_participation: number
}


export interface AplicationFormDirectorBoard {
    director_id: number;
    application_form_id: number;
    name: string;
    position: string;
    nit: string;
    peps: string;

}



export class Form{
    form_id?: number;
    form_type_id: number;
    credit_type_id?: number;
    amount?: number;
    destination?: string;
    month_duration?: number;
    warranty_type_id?: number;
    owner_name?: string;
    nit?: string;
    business_reason?: string;
    comercial_name?: string;
    economic_sector?: string;
    address?: string;
    phones?: string;
    contact_comercial_name?: string;
    position?: string;
    records_info_email?: string;
    records_info_name?: string;
    records_info_phone?: string;
    accounting_email?: string;
    accounting_name?: string;
    accounting_phone?: string;
    charges_email?: string;
    charges_name?: string;
    charges_phone?: string;
    bill_send_email?: string;
    bill_send_name?: string;
    bill_send_phone?: string;
    isr_email?: string;
    isr_name?: string;
    isr_phone?: string;
    core_business?: string;
    time_in_business?: number;
    last_year_sales?: number;
    iva_holder?: number;
    iva_percentage?: number;
    isr_holder?: number;
    isr_percentage?: number;
    web_page?: string;
    holding?: number;
    creation_date?: Date;
    last_mod?: Date;
    finish_date?: Date;
    director_boards?: AplicationFormDirectorBoard[];
    members?: AplicationFormMember[];
    legal_representatives?: AplicationFormLegalRepresentative[];
    suppliers?: AplicationFormSupplier[];
    factorings?: AplicationFormFactoring[];
    bank_accounts?: AplicationFormBankAccount[];
    bank_loans?: AplicationFormBankLoan[];
    companys?: AplicationFormCompany[];
    clients?: AplicationFormClient[];



    constructor(
    form_id?: number,
    form_type_id?: number,
    credit_type_id?: number ,
    amount?: number ,
    destination?: string ,
    month_duration?: number ,
    warranty_type_id?: number ,
    owner_name?: string ,
    nit?: string,
    business_reason?: string ,
    comercial_name?: string ,
    economic_sector?: string ,
    address?: string ,
    phones?: string ,
    contact_comercial_name?: string ,
    position?: string ,
    records_info_email?: string ,
    records_info_name?: string ,
    records_info_phone?: string ,
    accounting_email?: string,
    accounting_name?: string,
    accounting_phone?: string,
    charges_email?: string,
    charges_name?: string,
    charges_phone?: string,
    bill_send_email?: string,
    bill_send_name?: string,
    bill_send_phone?: string,
    isr_email?: string,
    isr_name?: string,
    isr_phone?: string,
    core_business?: string,
    time_in_business?: number,
    last_year_sales?: number,
    iva_holder?: number,
    iva_percentage?: number,
    isr_holder?: number,
    isr_percentage?: number,
    web_page?: string,
    holding?: number,
    creation_date?: Date,
    last_mod?: Date,
    finish_date?: Date,
    director_boards?: AplicationFormDirectorBoard[],
    members?: AplicationFormMember[],
    legal_representatives?: AplicationFormLegalRepresentative[],
    suppliers?: AplicationFormSupplier[],
    factorings?: AplicationFormFactoring[],
    bank_accounts?: AplicationFormBankAccount[],
    bank_loans?: AplicationFormBankLoan[],
    companys?: AplicationFormCompany[],
    clients?: AplicationFormClient[],
        ) {
            
    this.form_id = form_id;
    this.form_type_id = form_type_id;
    this.credit_type_id = credit_type_id;
    this.amount = amount;
    this.destination = destination;
    this.month_duration = month_duration;
    this.warranty_type_id = warranty_type_id;
    this.owner_name = owner_name;
    this.nit = nit;
    this.business_reason = business_reason;
    this.comercial_name = comercial_name;
    this.economic_sector = economic_sector;
    this.address = address;
    this.phones = phones;
    this.contact_comercial_name = contact_comercial_name;
    this.position = position;
    this.records_info_email = records_info_email;
    this.records_info_name = records_info_name;
    this.records_info_phone = records_info_phone;
    this.accounting_email = accounting_email;
    this.accounting_name = accounting_name;
    this.accounting_phone = accounting_phone;
    this.charges_email = charges_email;
    this.charges_name = charges_name;
    this.charges_phone = charges_phone;
    this.bill_send_email = bill_send_email;
    this.bill_send_name = bill_send_name;
    this.bill_send_phone = bill_send_phone;
    this.isr_email = isr_email;
    this.isr_name = isr_name;
    this.isr_phone = isr_phone;
    this.core_business = core_business;
    this.time_in_business = time_in_business;
    this.last_year_sales = last_year_sales;
    this.iva_holder = iva_holder;
    this.iva_percentage = iva_percentage;
    this.isr_holder = isr_holder;
    this.isr_percentage = isr_percentage;
    this.web_page = web_page;
    this.holding = holding;
    this.creation_date = creation_date;
    this.last_mod = last_mod;
    this.finish_date = finish_date;
    this.director_boards = director_boards;
    this.members = members;
    this.legal_representatives = legal_representatives;
    this.suppliers = suppliers;
    this.factorings = factorings;
    this.bank_accounts = bank_accounts;
    this.bank_loans = bank_loans;
    this.companys = companys;
    this.clients = clients;     
        }


}