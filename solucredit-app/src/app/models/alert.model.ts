export interface AlertPagination {
    count: number,
    alert: Alert[]
}

export interface GetAlertsResponse {
    success: boolean;
    data: AlertPagination;
}
export interface GetAlertResponse {
    success: boolean;
    data: Alert;
}

export class Alert{
    id?: number;
    signal: string;
    risk: string;
    reliever: string;
    department?: number;
    condition: string;

    constructor(
        id: number,
        signal: string,
        risk: string,
        reliever: string,
        department: number,
        condition: string,
    ){
        this.id = id;
        this.signal = signal;
        this.risk = risk;
        this.reliever = reliever;
        this.condition = condition;
        this.department= department;  

    }
}