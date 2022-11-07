import { CommercialAnalysis } from "./commercialanalysis.model";

export interface AdviserPagination {
    count: number;
    adviser: Adviser[]
}
export interface GetAdviserResponse {
    success: boolean;
    data: Adviser
}

export interface GetAdvisersResponse {
    success: boolean;
    data: AdviserPagination
}
export interface GetAdviserArrayResponse {
    success: boolean;
    data: Adviser[]
}
export class Adviser {
    id_adviser?: number;
    firstname: string;
    lastname: string;
    email: string;
    address?: string;
    phone?: string;
    professional_code?: string;
    firm_name?: string;
    firm_key?: string;
    outsourcing: number;
    id_adviser_type: number;
    holder: number;
    id_holder?: number;
    user_id: number;
    is_default: number;
    constructor(
        id: number,
        name: string,
        lastname: string,
        email: string,
        address: string,
        phone: string,
        professional_code: string,
        firm_name: string,
        firm_key: string,
        outsourcing: number,
        id_adviser_type: number,
        holder: number,
        id_holder: number,
        user_id: number,
        is_default: number
    ) {
        this.id_adviser = id;
        this.firstname = name;
        this.lastname = lastname;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.professional_code = professional_code;
        this.firm_key = firm_key
        this.firm_name = firm_name
        this.outsourcing = outsourcing
        this.id_adviser_type = id_adviser_type
        this.holder = holder
        this.id_holder = id_holder
        this.user_id = user_id
        this.is_default = is_default
    }
}

export class AdviserAnalysis {
    id_adviser_analysis?: number;
    id_adviser: number;
    id_commercialanalysis: number;
    creation_date?: Date;
    last_mod?: Date;
    priority?: number
    constructor(
        id: number,
        adviser: number,
        id_commercialanalysis: number,
        creation_date: Date,
        last_mod: Date,
        priority: number
    ) {
        this.id_adviser = adviser
        this.id_adviser_analysis = id
        this.id_commercialanalysis = id_commercialanalysis
        this.creation_date = creation_date
        this.last_mod = last_mod
        this.priority = priority
    }
}