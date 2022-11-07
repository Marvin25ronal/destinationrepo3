export interface RequirementsPagination {
    count: number,
    requirements: Requirements[]
}
export interface GetRequirementResponse {
    success: boolean;
    data: Requirements
}
export interface GetRequirementsResponse {
    success: boolean;
    data: RequirementsPagination
}

export class Requirements {
    id_requirements?: number;
    requirements_name: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_requirements: number,
        requirements_name: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_requirements = id_requirements;
        this.requirements_name = requirements_name;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}