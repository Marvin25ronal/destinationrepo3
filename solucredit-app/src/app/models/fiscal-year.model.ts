export interface FiscalYearPagination{
    count: number,
    fiscalperiod:  FiscalYear[]
}

export interface GetFiscalPeriodResponse{
    success: boolean;
    data: FiscalYear
}

export interface GetFiscalYearsResponse{
    success: boolean;
    data: FiscalYearPagination
}

export interface GetFiscalYearArrayResponse{
    success: boolean;
    data: FiscalYear[]
}

export class FiscalYear{
    fiscal_year_id?: number;
    fiscal_year_value?: number;
    status?: number;
    periodicity_id?: number;
    fiscal_year_note: string;
    period_start_date?: Date;
    period_end_date?: Date;
    note: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        fiscal_year_id: number,
        fiscal_year_value: number,
        status: number,
        periodicity_id: number,
        fiscal_year_note: string,
        note: string,
        period_start_date: Date,
        period_end_date: Date,
        creation_date: Date,
        last_mod: Date
    ) {
        this.fiscal_year_id = fiscal_year_id;
        this.fiscal_year_value = fiscal_year_value;
        this.status = status;
        this.periodicity_id = periodicity_id;
        this.fiscal_year_note = fiscal_year_note;
        this.period_start_date = period_start_date;
        this.period_end_date = period_end_date;
        this.note = note;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}