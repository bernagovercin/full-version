import { Component, OnInit, effect, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // Router'ı import ettik
import { FormBuilder, Validators, FormGroup } from '@angular/forms';  // Form işlemleri için gerekli importlar
import { ToastrService } from 'ngx-toastr';  // Toastr bildirimleri için import
import { AuthService } from 'src/app/theme/shared/service/auth.service';  // AuthenticationService import

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';
import { BerryConfig } from 'src/app/app-config';
import { tap } from 'rxjs';

@Component({
  selector: 'app-v3-login',
  imports: [RouterModule, SharedModule],
  templateUrl: './v3-login.component.html',
  styleUrls: ['./v3-login.component.scss']
})
export class V3LoginComponent implements OnInit {
  private themeService = inject(ThemeService);
  
  loginForm!: FormGroup; // Form grup değişkeni
  themeMode!: boolean;  // Tema modu değişkeni

  //  constructor
  constructor(
    private formBuilder: FormBuilder,  // FormBuilder servisi
    private authService: AuthService,  // AuthenticationService
    private router: Router,  // Router servisi
    private toastrService: ToastrService  // Toastr bildirim servisi
  ) {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkTheme());
    });
  }

  ngOnInit() {
    this.themeMode = BerryConfig.isDarkMode;
    this.createLoginForm(); // Formu oluştur
  }

  // Login formunu oluşturma
  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],  // E-mail alanı için validasyon
      password: ["", Validators.required]  // Parola alanı için validasyon
    });
  }
  

  login() {
    if (this.loginForm.invalid) {
      this.toastrService.error('Lütfen tüm alanları doldurun.');
      return;
    }
  
    const { email, password } = this.loginForm.value;
    const loginModel = { email, password };
  
    console.log('LoginModel:', loginModel);
  
    this.authService.login(loginModel).pipe(
      tap((response: any) => {
        console.log('Login Response:', response);
  
        if (response && response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);  // Token'ı kaydet
          this.toastrService.success('Giriş başarılı!');
          
          // Yönlendirme işlemi burada
          setTimeout(() => {
            console.log('Navigating to /user/add...');
            this.router.navigate(['/user/add']);
          }, 100); // 100ms gecikme
  
        } else {
          this.toastrService.error('Giriş işlemi başarısız.');
        }
        console.log(localStorage.getItem('token'));  // Token'ın kaydedilip kaydedilmediğini kontrol et
      })
    ).subscribe();
  }
  

  private isDarkTheme(isDark: boolean) {
    this.themeMode = isDark;
  }
}
