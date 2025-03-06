import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SingleReponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LoginModel } from '../models/login';
import { ToastrService } from 'ngx-toastr';  // ToastrService'i import et

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/v1/Auth/';
  public currentUserValue: any;

  constructor(
    private httpClient: HttpClient,
    private toastrService: ToastrService  // ToastrService'i inject et
  ) { }

  login(loginModel: LoginModel): Observable<SingleReponseModel<TokenModel>> {
    return this.httpClient.post<SingleReponseModel<TokenModel>>(this.apiUrl + 'login', loginModel).pipe(
      tap(response => {
        this.saveToken(response.data.token); // Token'ı kaydet
        this.currentUserValue = response.data; // currentUserValue'yu güncelle
        this.showSaveTokenPrompt(); // Kullanıcıya token'i kaydetmek isteyip istemediğini sor
      })
    );
  }

  // Token'i localStorage'a kaydetme metodu
  private saveToken(token: string): void {
    localStorage.setItem('token', token); // Token'ı localStorage'a kaydet
    console.log(localStorage.getItem('token')); // Kaydedilen token'i konsola yazdır
  }

  private showSaveTokenPrompt() {
    
      const token = localStorage.getItem('token');  // Token'i al
      if (token) {  // Token null değilse kaydet
        localStorage.setItem('savedToken', token);  // Token'i kaydet
        this.toastrService.success('Giriş bilgileriniz kaydedildi.', 'Başarılı');
      } else {
        this.toastrService.error('Token bulunamadı.', 'Hata');  // Token null ise hata göster
      }
    
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserValue = null;
  }
}