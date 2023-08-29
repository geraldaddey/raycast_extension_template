export interface CustomerData {
    status: string;
    message: string;
    data?: Array<CustomerInfo>;
}

export interface CustomerInfo {
    id: number;
    name: string;
    phone: string;
    email: string;
}
