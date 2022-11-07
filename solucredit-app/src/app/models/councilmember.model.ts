export interface CouncilMemberPagination{
    count: number,
    councilmember:  CouncilMember[]
}

export interface GetCouncilMemberResponse{
    success: boolean;
    data: CouncilMember
}

export interface GetCouncilMembersResponse{
    success: boolean;
    data: CouncilMemberPagination
}

export class CouncilMember{
    council_memeber_id?: number;
    council_member_type_id?: number;
    council_full_name: string;
    period_start_date?: Date;
    period_end_date: Date;
    note: string;
    status?: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        council_memeber_id: number,
        council_member_type_id: number,
        council_full_name: string,
        period_start_date: Date,
        period_end_date: Date,
        note: string,
        status: number,
        creation_date: Date,
        last_mod: Date
    )
    {
        this.council_memeber_id =council_memeber_id;
        this.council_full_name = council_full_name;
        this.council_member_type_id = council_member_type_id;
        this.period_start_date = period_start_date;
        this.period_end_date = period_end_date;
        this.note = note;
        this.status = status;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}