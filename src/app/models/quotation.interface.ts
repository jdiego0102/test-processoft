export interface Quotation {
    quotation_id?: number;
    city_id: number;
    name: string;
    email: number;
    cellphone_number: string;
    car_model: string;
    data_policy: boolean;
}

export interface QuotationResponse {
    status: string;
    title?: string;
    msg: string;
}