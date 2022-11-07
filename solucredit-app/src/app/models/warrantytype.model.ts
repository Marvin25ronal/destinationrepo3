export interface WarrantyTypePagination {
    count: number,
    warranty_type: WarrantyType[]
}

export interface GetWarrantyTypeResponse {
    success: boolean,
    data: WarrantyType
}

export interface GetWarrantyTypesResponse {
    success: boolean,
    data: WarrantyTypePagination
}

export class WarrantyType {
    warranty_type_id?: number;
    name: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id: number,
        name: string,
        creation_date: Date,
        last_mod: Date,
    ) {
        this.warranty_type_id = id;
        this.name = name;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}