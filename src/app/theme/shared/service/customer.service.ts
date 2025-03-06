import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer'; // Customer tipini import et
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Customer[]>(`${environment.apiUrl}Customers/getall`, { headers });
  }

  add(customer: Customer): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(`${environment.apiUrl}Customers`, customer, { headers, responseType: 'text' });
  }
  updateCustomer(customer: Customer): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put(`${environment.apiUrl}Customers`, customer, { headers, responseType: 'text' });
  }

  deleteCustomer(createdUserId: number, customerId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const body = {
      createdUserId: createdUserId,
      customerId: customerId
    };
    return this.httpClient.request('delete', `${environment.apiUrl}Customers`, {
      body: body,
      headers: headers,
      responseType: 'text'
    });
  }
}