import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(environment.apiUrl + "v1/" + "Users");
  }

  add(user: User): Observable<any> {
    return this.httpClient.post(environment.apiUrl + "v1/Users", user, { responseType: 'text' });
  }
 
  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}v1/Users/${userId}`, {
        responseType: 'text'
    });
  }
getUserById(userId: number): Observable<User> {
  return this.httpClient.get<User>(`${environment.apiUrl}v1/Users/${userId}`);
}

updateUser(user:User):Observable<any> {
  return this.httpClient.put(environment.apiUrl + "v1/Users", user, { responseType: 'text' });
}
}