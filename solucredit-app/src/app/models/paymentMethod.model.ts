export interface PaymentMethodPagination {
    count: number;
    payment_method: PaymentMethod[]
}
export interface GetPaymentMethodResponse {
    success: boolean;
    data: PaymentMethod;
}
export interface GetPaymentMethodsResponse {
    success: boolean;
    data: PaymentMethodPagination
}
export interface GetPaymentMethodsArrayResponse {
    success: boolean
    data: PaymentMethod[]
}
export class PaymentMethod {
    id_payment?: number;
    payment_name: string;
    description: NamedCurve;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id: number,
        name: string,
        description: string,
        creation_date: Date,
        last_mod: Date,

    ) {
        this.id_payment = id;
        this.payment_name = name;
        this.description = description;
        this.creation_date = last_mod;
        this.last_mod = last_mod;
    }
}