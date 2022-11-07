// export interface ConditionSheetInterface {
//     id: number
//     id_analysis: number
//     id_doc_warranty: number
//     document_number?: string
//     place_and_date?: string
//     customer_id: number
//     required_amount?: number
//     commission_rate?: number
//     commission_rate_flat?: number
//     interest_rate?: number
//     warranty_days?: number
//     arrears_interest?: number
//     administrative_expenses?: number
//     penalty_rate?: number
//     disbursement_expenses?: number
//     insurance?: number
//     other_conditions?: string
//     client_description?: string
// }

import { Banks } from "./bank.model"
import { Debtor } from "./debtor.model"
import { PaymentMethod } from "./paymentMethod.model"
import { Rate } from "./rate.model"

export interface PostInitConditionSheet {
    success: boolean
    data: ConditionSheet
}
export interface GetCustomerMemberInformationConditionSheetInterface {
    success: boolean
    data: CustomerMemberInformationConditionSheet
}
export interface GetMembersInformationConditionSheetInterface {
    success: boolean
    data: CustomerMemberInformationConditionSheet[]
}
export interface GetAuthorizedDebtorInterface {
    success: boolean
    data: AuthorizedDebtorConditionSheet
}
export interface GetAuthorizedDebtorsArrayInterface {
    success: boolean
    data: AuthorizedDebtorConditionSheet[]
}
export interface GetRatesArrayInterface {
    success: boolean
    data: Rate[]
}
export interface GetConditionSheetRatesArrayInterface {
    success: boolean
    data: ConditionSheetRate[]
}


export class AuthorizedDebtorConditionSheet {
    id: number
    id_condition_sheet: number
    id_debtor: number
    id_payment_method: number
    id_banks: number
    maximum_amount_to_discount?: number
    warranty_days?: number
    interest_rate?: number
    bank?: Banks
    debtor?: Debtor
    payment?: PaymentMethod
    constructor(
        id: number,
        id_condition_sheet: number,
        id_debtor: number,
        id_payment_method: number,
        id_banks: number,
        maximum_amount_to_discount: number,
        warranty_days: number,
        interest_rateL: number
    ) {
        this.id = id
        this.id_banks = id_banks
        this.id_condition_sheet = id_condition_sheet
        this.id_debtor = id_debtor
        this.id_payment_method = id_payment_method
        this.maximum_amount_to_discount = maximum_amount_to_discount
        this.warranty_days = warranty_days
        this.interest_rate = interest_rateL
    }
}
export class CustomerMemberInformationConditionSheet {
    id?: number
    id_condition_sheet?: number
    id_customer_member?: number
    participation_percentage?: number
    worker_position?: string
    name?: string
    constructor(
        id: number,
        id_condition_sheet: number,
        id_customer_member: number,
        participation_percentage: number,
        worker_position: string,
        name: string
    ) {
        this.id = id
        this.id_condition_sheet = id_condition_sheet
        this.id_customer_member = id_customer_member
        this.participation_percentage = participation_percentage
        this.worker_position = worker_position
        this.name = name
    }
}
export class ConditionSheetRate {
    id: number
    id_rates: number
    rate_type?: number
    rate_percentage?: number
    rate_amount?: number
    id_condition_sheet?: number

    constructor(
        id: number,
        id_rates: number,
        rate_type: number,
        rate_percentage: number,
        rate_amount: number,
        id_condition_sheet: number
    ) {
        this.id = id
        this.id_rates = id_rates
        this.rate_type = rate_type
        this.rate_percentage = rate_percentage
        this.rate_amount = rate_amount
        this.id_condition_sheet = id_condition_sheet
    }
}
export class ConditionSheet {
    id_condition_sheet?: number
    id_commercialanalysis?: number
    id_doc_warranty?: number
    document_number?: string
    place_and_date?: string
    customer_id: number
    required_amount?: number
    warranty_days?: number
    administrative_expenses?: number
    disbursement_expenses?: number
    insurance?: number
    other_conditions?: string
    client_description?: string
    status_condition_sheet?: number
    approval_date?: Date
    branch_office?: number
    constructor(
        id: number,
        id_analysis: number,
        id_doc_warranty: number,
        document_number: string,
        place_and_date: string,
        customer_id: number,
        required_amount: number,

        warranty_days: number,

        administrative_expenses: number,
        disbursement_expenses: number,
        insurance: number,
        other_condition: string,
        client_description: string,
        status_condition_sheet: number,
        branch_office: number
    ) {
        this.id_condition_sheet = id
        this.id_commercialanalysis = id_analysis
        this.id_doc_warranty = id_doc_warranty
        this.document_number = document_number
        this.place_and_date = place_and_date
        this.customer_id = customer_id
        this.required_amount = required_amount
        this.warranty_days = warranty_days
        this.administrative_expenses = administrative_expenses
        this.disbursement_expenses = disbursement_expenses
        this.insurance = insurance
        this.other_conditions = other_condition
        this.client_description = client_description
        this.status_condition_sheet = status_condition_sheet
        this.branch_office = branch_office

    }
}