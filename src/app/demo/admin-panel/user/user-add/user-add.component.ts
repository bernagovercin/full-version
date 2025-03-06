import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/theme/shared/models/user';
import { UserService } from 'src/app/theme/shared/service/user.service'; // Servis ismi
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-user-add',
  imports: [SharedModule],
  
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  userAddForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,  // UserService'i inject et
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createUserAddForm();  // Formu başlat
  }

  // Formu oluştur
  createUserAddForm() {
    this.userAddForm = this.formBuilder.group({
      citizenId: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobilePhones: ['', Validators.required],
      gender: ['', Validators.required],
      birthDate: ['', Validators.required],
      address: ['', Validators.required],
      notes: [''],
      password: ['', Validators.required]
    });
  }

  // Form gönderildiğinde çalışacak metod
  add() {
    if (this.userAddForm.valid) {
      const userModel = Object.assign({}, this.userAddForm.value);
      this.userService.add(userModel).subscribe(
        response => {
          this.toastrService.success("Kullanıcı başarıyla eklendi.", "Başarılı");
        },
        error => {
          console.error('Hata Detayı:', error); // Hata detayını konsola yazdır
          if (error.error && error.error.errors) {
            for (const key in error.error.errors) {
              if (error.error.errors.hasOwnProperty(key)) {
                this.toastrService.error(
                  error.error.errors[key].join(", "),
                  "Doğrulama Hatası"
                );
              }
            }
          } else {
            this.toastrService.error("Bilinmeyen bir hata oluştu.", "Hata");
          }
        }
      );
    } else {
      this.toastrService.error("Formunuz eksik veya hatalı", "Dikkat");
    }
  }}
  
