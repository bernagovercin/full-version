import { BaseEntity } from "./base-entity";

export interface Color extends BaseEntity{
    Id: number;
    ColorName: string;
    HexCode: string;
}
