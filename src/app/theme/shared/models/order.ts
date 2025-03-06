import { BaseEntity } from "./base-entity";

export interface Order extends BaseEntity {
    id: number;
    customerName: number;
    location: number;
    category: number;
    productName: number;
    color: number;
    size: number;
    quantity: number;
    price: number;
}
