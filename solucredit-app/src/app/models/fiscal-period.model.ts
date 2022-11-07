export interface FiscalPeriodPagination{
    count: number,
    fiscalperiod:  FiscalPeriod[]
}

export interface GetFiscalPeriodResponse{
    success: boolean;
    data: FiscalPeriod
}

export interface GetFiscalPeriodsResponse{
    success: boolean;
    data: FiscalPeriodPagination
}

export class FiscalPeriod{
    fiscal_period_id?: number;
    fiscal_year_id?: number;
    period_name: string;
    period_start_date?: Date;
    period_end_date?: Date;
    note: string;
    status?: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        fiscal_period_id: number,
        fiscal_year_id: number,
        period_name: string,
        status: number,
        note: string,
        period_start_date: Date,
        period_end_date: Date,
        creation_date: Date,
        last_mod: Date
    ) {
        this.fiscal_period_id = fiscal_period_id;
        this.fiscal_year_id = fiscal_year_id;
        this.period_name = period_name;
        this.period_start_date = period_start_date;
        this.period_end_date = period_end_date;
        this.note = note;
        this.status = status;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}