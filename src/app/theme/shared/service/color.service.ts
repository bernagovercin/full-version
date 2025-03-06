import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { ListResponseModel } from '../models/ListResponseModel';

import { Color } from '../models/color';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
 
  constructor(private httpClient: HttpClient) { }

  getColors(): Observable<Color[]> {
    return this.httpClient.get<Color[]>(environment.apiUrl + "Colors/getall");
  }

 
  add(color: Color): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "Colors", color, { responseType: 'text' });
  }

  deleteColor(name:string): Observable<any> {
    const body = {
      name:name
    };
  
    return this.httpClient.request('delete', `${environment.apiUrl}Colors`, {
      body: body,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'text' 
    });
  }
  
   // müşteriID'ye göre getiriyoruz
  getColorById(colorId: number): Observable<Color> {
    return this.httpClient.get<Color>(`${environment.apiUrl}Colors/${colorId}`);
  }
  
  updateColor(color: Color): Observable<any> {
    return this.httpClient.put(environment.apiUrl + "Colors", color, { responseType: 'text' });
  }}

