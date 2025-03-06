import { Component, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { map, Observable } from 'rxjs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { User } from 'src/app/theme/shared/service/user.service';
import { UserListService } from './user-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/theme/shared/service/user.service'; // UserService'i import et
import { ToastrService } from 'ngx-toastr'; // ToastrService'i import et

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [SharedModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [UserListService, DecimalPipe]
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  total$: Observable<number>;
  pageSizes = [5, 10, 15];
  currentPageSize = 5;
  page = 1;
  userIdToDelete: number | null = null; // Silinecek kullanıcının ID'si
  selectedUser: User | null = null; // Düzenlenecek kullanıcı

  constructor(
    public service: UserListService,
    private modalService: NgbModal,
    private userService: UserService, // UserService'i enjekte et
    private toastr: ToastrService // ToastrService'i enjekte et
  ) {
    this.users$ = this.service.users$;
    this.total$ = this.service.total$;
  }

  ngOnInit(): void {
    this.service.pageSize = this.currentPageSize;
    this.getUsers(); // Kullanıcıları yükle
  }

  onSearchChange(searchTerm: string): void {
    this.service.searchTerm = searchTerm;
  }

  onPageChange(page: number): void {
    this.page = page;
    this.service.page = page;
  }

  onPageSizeChange(pageSize: number): void {
    this.service.pageSize = pageSize;
    this.currentPageSize = pageSize;
  }

  editUser(editModal: ElementRef, user: User): void {
    this.selectedUser = { ...user }; // Düzenlenecek kullanıcıyı seç
    this.modalService.open(editModal); // Düzenleme modalını aç
  }

  saveChanges(): void {
    if (this.selectedUser) {
      this.userService.editUser(this.selectedUser).subscribe({
        next: (response) => {
          console.log('User updated successfully', 'Success', response);
          this.toastr.success('User updated successfully', 'Success'); // Toastr bildirimi
          this.modalService.dismissAll(); // Modalı kapat
          this.getUsers(); // Kullanıcı listesini yenile
        },
        error: (error) => {
          console.error('Kullanıcı güncellenirken hata oluştu:', error);
          this.toastr.error('Kullanıcı güncellenirken bir hata oluştu.', 'Hata!'); // Hata durumunda Toastr bildirimi
        }
      });
    }
  }

  deleteUser(deleteModal: ElementRef, user: User): void {
    this.userIdToDelete = user.userId; // Silinecek kullanıcının ID'sini ayarla
    this.modalService.open(deleteModal); // Silme modalını aç
  }

  confirmDelete(): void {
    if (this.userIdToDelete !== null) {
      this.userService.deleteUser(this.userIdToDelete).subscribe({
        next: (response) => {
          console.log('User Deleted', response);
          this.toastr.success('User succesfully deleted.', 'Success!'); // Toastr bildirimi
          this.modalService.dismissAll(); // Modalı kapat
          this.getUsers(); // Kullanıcı listesini yenile
        },
        error: (error) => {
          console.error('Kullanıcı silinirken hata oluştu:', error);
          this.toastr.error('Kullanıcı silinirken bir hata oluştu.', 'Hata!'); // Hata durumunda Toastr bildirimi
        }
      });
    }
  }

  getUsers(): void {
    this.users$ = this.userService.getUsers();
  }
}