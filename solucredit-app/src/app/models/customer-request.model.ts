export interface GetCustomerRequestResponse{
    count: number,
    data: CustomerRequest
}

export class CustomerRequest{
    request_id: number;
    customer_id: number;
    documents: string;
    verifications: number;
    warranties: number;
    status: number;
    type: number;
    create_date: Date;
    last_date: Date;
    warranty_type: number;
    doc_type: number;
    sys_warranty_id: number;
    location: number;
    time_in_months: number;
    destination: string;
    constructor(
        request_id: number,
        customer_id: number,
        documents: string,
        warranties: number,
        verifications: number,
        status: number,
        type: number,
        create_date: Date,
        last_date: Date,
        warranty_type: number,
        doc_type: number,
        sys_warranty_id: number,
        location: number,
        time_in_months: number,
        destination: string,
    )
    {
        this.request_id = request_id;
        this.customer_id = customer_id;
        this.documents = documents;
        this.verifications = verifications;
        this.warranties = warranties;
        this.status = status;
        this.type = type;
        this.create_date = create_date;
        this.last_date = last_date;
        this.warranty_type = warranty_type;
        this.doc_type = doc_type;
        this.sys_warranty_id = sys_warranty_id;
        this.location = location;
        this.time_in_months = time_in_months;
        this.destination = destination;
    }
}