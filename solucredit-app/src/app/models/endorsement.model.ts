export interface EndorsementPagination {
    count: number,
    endorsement: Endorsement[]
}
export interface GetEndorsementResponse {
    success: boolean;
    data: Endorsement
}
export interface GetEndorsementsResponse {
    success: boolean;
    data: EndorsementPagination
}

export class Endorsement {
    id_endorsement?: number;
    endorsement_name: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_endorsement: number,
        endorsement_name: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_endorsement = id_endorsement;
        this.endorsement_name = endorsement_name;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}