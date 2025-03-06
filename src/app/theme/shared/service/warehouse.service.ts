import { Injectable } from '@angular/core';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/ListResponseModel';
import { Warehouse } from '../models/warehouse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private httpClient: HttpClient) { }


  getWarehouses(): Observable<Warehouse[]> {
    return this.httpClient.get<Warehouse[]>(environment.apiUrl + "Warehouses/getall");
  }
  
  add(warehouse: Warehouse): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "Warehouses", warehouse, { responseType: 'text' });
  }

  deleteWarehouse(createdUserId: number, warehouseId: number): Observable<any> {
    const body = {
      createdUserId: createdUserId,
      warehouseId: warehouseId,
    };
  
    return this.httpClient.delete(`${environment.apiUrl}Warehouses`, {
      body,
      responseType: 'text'  
    });
  }
 
 getWarehouseById(wareHouseId: number): Observable<Warehouse> {
  return this.httpClient.get<Warehouse>(`${environment.apiUrl}Warehouses/${wareHouseId}`);
}

updateWarehouse(warehouse: any): Observable<any> {
  return this.httpClient.put(`${environment.apiUrl}Warehouses`, warehouse, { responseType: 'text' }); 
}

  // Yeni metod: Depo miktarını günceller
  updateWarehouseQuantity(warehouseId: number, quantity: number): Observable<any> {
    const body = {
      warehouseId: warehouseId,
      quantity: quantity
    };
    return this.httpClient.patch(`${environment.apiUrl}Warehouses/updateQuantity`, body, { responseType: 'text' });
  }

}
