import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment'; // Yeni environment dosyasına doğru yönlendirme
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService
  ) { }

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.httpClient.get<User[]>(`${environment.apiUrl}v1/Users`, { headers }).pipe(
      map((response: any) => {
        // Eğer response bir nesne ise, bu nesneyi bir diziye dönüştür
        if (response && typeof response === 'object' && !Array.isArray(response)) {
          return Object.values(response) as User[];
        }
        return response as User[];
      }),
      map((users: User[]) => users.filter(user => user.status === true)) // Sadece active kullanıcıları döndür
    );
  }

  add(user: User): Observable<any> {
    const token = localStorage.getItem('token'); // Token'ı localStorage'dan al
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Token'ı header'a ekle
    });
  
    return this.httpClient.post(`${environment.apiUrl}v1/Users`, user, { headers, responseType: 'text' });
  }
  
  deleteUser(userId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.httpClient.delete(`${environment.apiUrl}v1/Users/${userId}`, { headers, responseType: 'text' }).pipe(
      tap((response) => {
        console.log('Kullanıcı silindi:', response);
        //this.toastrService.success('Kullanıcı başarıyla silindi.', 'Başarılı!'); // Toastr bildirimi
      }),
      catchError((err) => {
        console.error('Silme işlemi sırasında hata oluştu:', err);
        //this.toastrService.error('Kullanıcı silinirken bir hata oluştu.', 'Hata!'); // Hata durumunda Toastr bildirimi
        return throwError(() => err);
      })
    );
  }

  // Kullanıcıyı ID'ye göre alma
  getUserById(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiUrl}v1/Users/${userId}`);
  }

  editUser(user: User): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.httpClient.put(`${environment.apiUrl}v1/Users`, user, { headers, responseType: 'text' }).pipe(
      tap((response) => {
        console.log('Kullanıcı güncellendi:', response);
      }),
      catchError((err) => {
        console.error('Güncelleme işlemi sırasında hata oluştu:', err);
        return throwError(() => err);
      })
    );
  }
}

export { User }; 