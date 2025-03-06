import { BaseEntity } from "./base-entity";
import { Color } from "./color";
import { SizeEnum } from "./sizeEnum";


export interface Product extends BaseEntity {
    id: number;
    imagePath: string;
    category: string; 
    productName: string;
    colorName: string; 
    size: SizeEnum;
    quantity: number;
    price: number; 
  }
  