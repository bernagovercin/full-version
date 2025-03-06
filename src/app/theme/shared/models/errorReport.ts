import { BaseEntity } from "./base-entity";

export interface ErrorReport extends BaseEntity{
    id: number;
    title: string;
    description: string;
    severity: number;
    component: string;
    solutionStatus: string;
    resolutionMessage: string;
}
