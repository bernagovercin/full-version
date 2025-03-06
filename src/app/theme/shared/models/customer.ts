import { BaseEntity } from "./base-entity";


export interface Customer extends BaseEntity {

  customerId: number;
  imagePath: string;
  customerName: string;
  location: string;
  gender: string;
  email: string;
  phoneNumber: string;

}