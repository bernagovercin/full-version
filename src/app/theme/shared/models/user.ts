import { BaseEntity } from "./base-entity";

export interface User extends BaseEntity{

  userId:number;

  fullName: string;
  email: string;
  refreshToken:string;
  mobilePhones: string;
  status: boolean;
  birthDate:Date;
  gender: number;
  recordDate:Date;
  address: string;
  notes: string;
  updateContactDate: Date;
  password: string;
  
 }
  