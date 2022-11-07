export interface QuotaTypePagination {
    count: number,
    quotatype: QuotaType[]
}
export interface GetQuotaTypeResponse {
    success: boolean;
    data: QuotaType
}
export interface GetQuotaTypesResponse {
    success: boolean;
    data: QuotaTypePagination
}

export class QuotaType {
    quota_type_id?: number;
    quota_type_name: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        _quota_type_id: number,
        _quota_type_name: string,
        _creation_date: Date,
        _last_mod: Date
    ) {
        this.quota_type_id = _quota_type_id;
        this.quota_type_name = _quota_type_name;
        this.creation_date = _creation_date;
        this.last_mod = _last_mod;
    }
}