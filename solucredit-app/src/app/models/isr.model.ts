export interface ISRPagination {
    count: number,
    isr: ISR[]
}
export interface GetISRResponse {
    success: boolean;
    data: ISR
}
export interface GetISRsResponse {
    success: boolean;
    data: ISRPagination
}

export class ISR {
    id_isr?: number;
    isr_name: string;
    isr_percentage: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_isr: number,
        isr_name: string,
        isr_percentage: number,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_isr = id_isr;
        this.isr_name = isr_name;
        this.isr_percentage = isr_percentage;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}

export class IVA {
    id?: number;
    name: string;
    percentage: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_isr: number,
        isr_name: string,
        isr_percentage: number,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id = id_isr;
        this.name = isr_name;
        this.percentage = isr_percentage;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}