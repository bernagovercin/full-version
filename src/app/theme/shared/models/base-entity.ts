// base.entity.ts
export interface BaseEntity {
    createdUserId: number;
    createdDate: string; 
    lastUpdatedUserId: number;
    lastUpdatedDate: string; 
    status: boolean;
    isDeleted: boolean;
  }
  