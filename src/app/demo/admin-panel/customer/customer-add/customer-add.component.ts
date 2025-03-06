import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/theme/shared/service/customer.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/theme/shared/models/customer';
import { SharedModule } from "../../../../theme/shared/shared.module";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
  imports: [SharedModule]
})
export class CustomerAddComponent implements OnInit {
  customerAddForm!: FormGroup;
  images: string[] = [
    'avatar-1.jpg',
    'avatar-2.jpg',
    'avatar-3.jpg',
    'avatar-4.jpg',
    'avatar-5.jpg',
    'avatar-6.jpg',
    'avatar-7.jpg',
    'avatar-8.jpg',
    'avatar-9.jpg',
    'avatar-10.jpg'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createCustomerAddForm();
  }

  createCustomerAddForm() {
    this.customerAddForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      location: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      imagePath: ['', Validators.required]
    });
  }

  add() {
    if (this.customerAddForm.valid) {
      const customerModel: Customer = Object.assign({}, this.customerAddForm.value);
      // customerModel.imagePath zaten "avatar-1.jpg" gibi bir değer alacak
  
      this.customerService.add(customerModel).subscribe(
        (response: any) => {
          console.log('Customer added successfully:', response.message);
          this.toastrService.success(response.message, "Success");
          this.customerAddForm.reset();
        },
        error => {
          console.error('Error:', error);
          this.toastrService.error("An error occurred while adding the customer", "Error");
        }
      );
    } else {
      this.toastrService.error("Please fill in all required fields", "Warning");
    }
  }}