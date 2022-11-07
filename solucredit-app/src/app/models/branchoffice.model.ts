export interface BranchOfficePagination {
    count: number,
    branchoffice: BranchOffice[]
}
export interface GetBranchOfficeResponse {
    success: boolean;
    data: BranchOffice
}

export interface GetBranchOfficesResponse {
    success: boolean;
    data: BranchOfficePagination
}

export class BranchOffice {
    id_branchoffice?: number;
    branchoffice_id?: number;
    branchoffice_socialr?: string;
    branchoffice_code?: string;
    branchoffice_name?: string;
    branchoffice_product?: number;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_branchoffice: number,
        branchoffice_id: number,
        branchoffice_socialr: string,
        branchoffice_code: string,
        branchoffice_name: string,
        branchoffice_product: number,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_branchoffice = id_branchoffice;
        this.branchoffice_id = branchoffice_id;
        this.branchoffice_socialr = branchoffice_socialr;
        this.branchoffice_code = branchoffice_code;
        this.branchoffice_name = branchoffice_name;
        this.branchoffice_product = branchoffice_product;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}