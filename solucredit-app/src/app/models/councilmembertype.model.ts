export interface CouncilMemberTypePagination{
    count: number,
    fiscalperiod:  CouncilMemberType[]
}

export interface GetCouncilMemberTypePaginationResponse{
    success: boolean;
    data: CouncilMemberType
}

export interface GetCouncilMemberTypePaginationsResponse{
    success: boolean;
    data: CouncilMemberTypePagination
}

export interface GetCouncilMemberTypePaginationArrayResponse{
    success: boolean;
    data: CouncilMemberType[]
}

export class CouncilMemberType{
    council_member_type_id?: number;
    counsil_memeber_type_name: string;
    note: string;
    status?: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        council_member_type_id: number,
        counsil_memeber_type_name: string,
        note: string,
        status: number,
        creation_date: Date,
        last_mod: Date
    )
    {
        this.council_member_type_id =council_member_type_id;
        this.counsil_memeber_type_name = counsil_memeber_type_name;
        this.note = note;
        this.status = status;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}