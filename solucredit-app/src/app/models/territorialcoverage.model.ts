export interface TerritorialCoveragePagination {
    count: number,
    territorial_coverage: TerritorialCoverage[]
}
export interface GetTerritorialCoverageResponse {
    success: boolean;
    data: TerritorialCoverage
}

export interface GetTerritorialCoveragesResponse {
    success: boolean;
    data: TerritorialCoveragePagination
}

export class TerritorialCoverage {
    id_territorial_coverage?: number;
    territorial_coverage_name: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_coverage: number,
        coverage_name: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_territorial_coverage = id_coverage;
        this.territorial_coverage_name = coverage_name;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}