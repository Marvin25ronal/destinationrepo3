export interface RequestReport {
    name: string;
    nit: string;
    request_id: number;
    customer_id: number;
    documents: number;//0 pendiente, 1 completo
    warranties: number;//0 pendiente, completo
    status: number;// 0 penidnete, 1 precalificado, 2 comite_de_creditos
    type: number;// 0 tradicional, 1 especial, 3 especiales, 4 pronto_pago
    create_date: Date;
    verifications: number;// 0 pendiente, 1 completo
}
export interface RequestReportResponse {
    count: number;
    data: RequestReport[];
}
export interface GetRequestReportResponse {
    success: boolean;
    data: RequestReportResponse;
}