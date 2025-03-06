import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  // Tüm siparişleri getirir
  getOrders(): Observable<Order[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Order[]>(environment.apiUrl + "Orders/getall", { headers });
  }

  // Yeni sipariş ekler
  add(order: Order): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(environment.apiUrl + "Orders", order, { headers, responseType: 'text' });
  }

  // Sipariş silme işlemi
  deleteOrder(orderId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const options = {
      headers: headers,
      body: { orderId: orderId },
      responseType: 'text' as const
    };
    return this.httpClient.delete(`${environment.apiUrl}Orders`, options);
  }

  // Siparişi ID'ye göre getirir
  getOrdersById(orderId: number): Observable<Order> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Order>(`${environment.apiUrl}Orders/${orderId}`, { headers });
  }

  // Siparişi günceller
  updateOrder(order: Order): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put(`${environment.apiUrl}Orders`, order, { headers, responseType: 'text' });
  }
}

  // Siparişten sonra depo miktarını günceller
  //private updateWarehouseQuantityAfterOrder(productId: number, orderQuantity: number) {
    // İlk olarak, ilgili ürünün bulunduğu depoyu al
   // this.warehouseService.getWarehouses().subscribe(warehouses => {
      //const warehouseToUpdate = warehouses.find(w => w.productId === productId);

     // if (warehouseToUpdate) {
        // Depo bulunduysa, miktarı azalt
       // const newQuantity = warehouseToUpdate.quantity - orderQuantity;

        // Yeni miktarı güncelle
      //  this.warehouseService.updateWarehouseQuantity(warehouseToUpdate.wareHouseId, newQuantity).subscribe();
      
   // });
//  }
//}
