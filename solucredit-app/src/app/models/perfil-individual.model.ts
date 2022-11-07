export interface SaveFormResponse{
    success: boolean;
    data: ProfileForm;
}

export interface ProfileFormOwnerReq {
    owner_id?: number;
    profile_form_id?: number;
    name?: string;
    position?: string;
    nit?: string;
}
export interface ProfileFormAssociateReq {
    associate_id?: number;
    profile_form_id?: number;
    name?: string;
    position?: string;
    nit?: string;
    shareholding?: number;
    remove?: boolean;
}
​
export interface ProfileFormCompanyReq {
    company_id?: number,
    profile_form_id?: number;
    comercial_name?: string;
    relation?: string;
    nit?: string;
    country?: string;
    business_activity?: string;
    remove?: boolean;
​
}
​
export interface ProfileFormCountryOperationReq {
    country_operation_id?: number;
    profile_form_id?: number;
    year_sales?: number;
    country?: string;
    remove?: boolean;
}
export class ProfileForm {
    profile_form_id?: number;
    form_type_id?: number;
    comercial_name?: string;
    ceo_name?: string;
    ceo_time?: string;
    finance_ceo_name?: string;
    finance_ceo_time?: string;
    rh_ceo_name?: string;
    rh_ceo_time?: string;
    prod_ceo_name?: string;
    prod_ceo_time?: string;
    op_ceo_name?: string;
    op_ceo_time?: string;
    sales_ceo_name?: string;
    sales_ceo_time?: string;
    credit_ceo_name?: string;
    credit_ceo_time?: string;
    productions_commerce?: string;
    brands?: string;
    first_quarter?: number;
    second_quarter?: number;
    third_quarter?: number;
    fourth_quarter?: number;
    product_segment?: string;
    competitors?: string;
    market_percentage?: string;
    distribution_channels?: string;
    cash_sales?: number;
    credit_sales?: number;
    local_sales?: number;
    exports_sales?: number;
    sales_foreign_currency?: number;
    sales_foreign_currency_origin?: string;
    cash_purchases?: number;
    credit_purchases?: number;
    local_purchases?: number;
    exports_purchases?: number;
    purchases_foreign_currency?: number;
    purchases_foreign_currency_origin?: string;
    creation_date?: Date;
    last_mod?: Date;
    finish_date?: Date;
    owner?: ProfileFormOwnerReq;
    associates?: ProfileFormAssociateReq[];
    companies?: ProfileFormCompanyReq[];
    country_operations?: ProfileFormCountryOperationReq[];


    constructor(
        profile_form_id?: number,
        form_type_id?: number,
        comercial_name?: string,
        ceo_name?: string,
        ceo_time?: string,
        finance_ceo_name?: string,
        finance_ceo_time?: string,
        rh_ceo_name?: string,
        rh_ceo_time?: string,
        prod_ceo_name?: string,
        prod_ceo_time?: string,
        op_ceo_name?: string,
        op_ceo_time?: string,
        sales_ceo_name?: string,
        sales_ceo_time?: string,
        credit_ceo_name?: string,
        credit_ceo_time?: string,
        productions_commerce?: string,
        brands?: string,
        first_quarter?: number,
        second_quarter?: number,
        third_quarter?: number,
        fourth_quarter?: number,
        product_segment?: string,
        competitors?: string,
        market_percentage?: string,
        distribution_channels?: string,
        cash_sales?: number,
        credit_sales?: number,
        local_sales?: number,
        exports_sales?: number,
        sales_foreign_currency?: number,
        sales_foreign_currency_origin?: string,
        cash_purchases?: number,
        credit_purchases?: number,
        local_purchases?: number,
        exports_purchases?: number,
        purchases_foreign_currency?: number,
        purchases_foreign_currency_origin?: string,
        creation_date?: Date,
        last_mod?: Date,
        finish_date?: Date,
        owner?: ProfileFormOwnerReq,
        associates?: ProfileFormAssociateReq[],
        companies?: ProfileFormCompanyReq[],
        country_operations?: ProfileFormCountryOperationReq[],
    ){
        this.profile_form_id = profile_form_id;
        this.form_type_id = form_type_id;
        this.comercial_name = comercial_name;
        this.ceo_name = ceo_name;
        this.ceo_time = ceo_time;
        this.finance_ceo_name = finance_ceo_name;
        this.finance_ceo_time = finance_ceo_time;
        this.rh_ceo_name = rh_ceo_name;
        this.rh_ceo_time = rh_ceo_time;
        this.prod_ceo_name = prod_ceo_name;
        this.prod_ceo_time = prod_ceo_time;
        this.op_ceo_name = op_ceo_name;
        this.op_ceo_time = op_ceo_time;
        this.sales_ceo_name = sales_ceo_name;
        this.sales_ceo_time = sales_ceo_time;
        this.credit_ceo_name = credit_ceo_name;
        this.credit_ceo_time = credit_ceo_time;
        this.productions_commerce = productions_commerce;
        this.brands = brands;
        this.first_quarter = first_quarter;
        this.second_quarter = second_quarter;
        this.third_quarter = third_quarter;
        this.fourth_quarter = fourth_quarter;
        this.product_segment = product_segment;
        this.competitors = competitors;
        this.market_percentage = market_percentage;
        this.distribution_channels = distribution_channels;
        this.cash_sales = cash_sales;
        this.credit_sales = credit_sales;
        this.local_sales = local_sales;
        this.exports_sales = exports_sales;
        this.sales_foreign_currency = sales_foreign_currency;
        this.sales_foreign_currency_origin = sales_foreign_currency_origin;
        this.cash_purchases = cash_purchases;
        this.credit_purchases = credit_purchases;
        this.local_purchases = local_purchases;
        this.exports_purchases = exports_purchases;
        this.purchases_foreign_currency = purchases_foreign_currency;
        this.purchases_foreign_currency_origin = purchases_foreign_currency_origin;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
        this.finish_date = finish_date;
        this.owner = owner;
        this.associates = associates;
        this.companies = companies;
        this.country_operations = country_operations;

    }
​
​
}