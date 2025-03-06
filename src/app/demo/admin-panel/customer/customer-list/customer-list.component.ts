import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Customer } from 'src/app/theme/shared/models/customer'; // Customer tipini import et
import { CustomerListService } from './customer-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/theme/shared/service/customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  imports: [SharedModule, RouterModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [CustomerListService, DecimalPipe]
})
export class CustomerListComponent implements OnInit {
  service = inject(CustomerListService); // inject ile enjekte et
  customers$: Observable<Customer[]>; // Customer tipini kullan
  total$: Observable<number>;
  selectedCustomer: Customer | null = null;
  customerIdToDelete: number | null = null;

  constructor(
    private modalService: NgbModal,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {
    this.customers$ = this.service.customers$;
    this.total$ = this.service.total$;
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customers$ = this.customerService.getCustomers();
  }

  editCustomer(editModal: any, customer: Customer) {
    this.selectedCustomer = { ...customer }; // Müşteri bilgilerini kopyala
    this.modalService.open(editModal); // Modal'ı aç
  }

  saveChanges() {
    if (this.selectedCustomer) {
      this.customerService.updateCustomer(this.selectedCustomer).subscribe(
        response => {
          this.toastrService.success('Customer updated successfully', 'Success');
          this.modalService.dismissAll();
          this.loadCustomers();
        },
        error => {
          console.error('Error updating customer:', error);
          this.toastrService.error('Error updating customer', 'Error');
        }
      );
    }
  }

  deleteCustomer(deleteModal: ElementRef, customer: Customer) {
    this.customerIdToDelete = customer.customerId;
    this.modalService.open(deleteModal);
  }

  confirmDelete() {
    if (this.customerIdToDelete !== null) {
      this.customerService.deleteCustomer(1, this.customerIdToDelete).subscribe(
        response => {
          this.toastrService.success('Customer deleted successfully', 'Success');
          this.modalService.dismissAll();
          this.loadCustomers();
        },
        error => {
          console.error('Error deleting customer:', error);
          this.toastrService.error('Error deleting customer', 'Error');
        }
      );
    }
  }
}