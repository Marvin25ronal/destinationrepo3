export interface ProductTypePagination {
    count: number,
    producttype: ProductType[]
}
export interface GetProductTypeResponse {
    success: boolean;
    data: ProductType
}
export interface GetProductTypesResponse {
    success: boolean;
    data: ProductTypePagination
}

export class ProductType {
    id_producttype?: number;
    producttype_name: string;
    creation_date?: Date;
    last_mod?: Date;
    constructor(
        id_producttype: number,
        producttype_name: string,
        creation_date: Date,
        last_mod: Date
    ) {
        this.id_producttype = id_producttype;
        this.producttype_name = producttype_name;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
    }
}