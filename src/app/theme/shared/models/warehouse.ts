import { BaseEntity } from './base-entity';
import { SizeEnum } from './sizeEnum';

export interface Warehouse extends BaseEntity {
  id: number;
  category: string;
  productName: string;
  colorName: string;
  size: SizeEnum;
  quantity: number;
}