export interface ProductPagination {
    count: number,
    product: Product[]
}
export interface GetProductResponse {
    success: boolean;
    data: Product
}
export interface GetProductsResponse {
    success: boolean;
    data: ProductPagination
}

export class Product {
    id_product?: number;
    product_name: string;
    product_type?: number;
    product_description: string;
    creation_date?: Date;
    last_mod?: Date;
    product_code: string;
    constructor(
        id_product: number,
        product_name: string,
        product_type: number,
        product_description: string,
        creation_date: Date,
        last_mod: Date,
        product_code: string
    ) {
        this.id_product = id_product;
        this.product_name = product_name;
        this.product_type = product_type;
        this.product_description = product_description;
        this.creation_date = creation_date;
        this.last_mod = last_mod;
        this.product_code = product_code;
    }
}