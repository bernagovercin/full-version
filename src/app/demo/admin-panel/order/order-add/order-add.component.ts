import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/theme/shared/service/order.service';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/theme/shared/models/order';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-order-add',
  imports: [SharedModule],
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.scss']
})
export class OrderAddComponent implements OnInit {
  orderAddForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createOrderAddForm();
  }

  createOrderAddForm() {
    this.orderAddForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      location: ['', Validators.required],
      category: ['', Validators.required],
      productName: ['', Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  add() {
    if (this.orderAddForm.valid) {
      const orderModel: Order = Object.assign({}, this.orderAddForm.value);
      
      // API'ye gönderilecek ekstra alanlar
      orderModel.createdDate = new Date().toISOString();
      orderModel.lastUpdatedUserId = 0; // Varsayılan değer
      orderModel.lastUpdatedDate = new Date().toISOString();
      orderModel.status = true; // Varsayılan değer
      orderModel.isDeleted = false; // Varsayılan değer
      orderModel.id = 0; // API otomatik atayacak

      this.orderService.add(orderModel).subscribe(
        (response: any) => {
          console.log('Order added successfully:', response);
          this.toastrService.success(response, "Success");
          this.orderAddForm.reset();
        },
        error => {
          console.error('Error:', error);
          this.toastrService.error("An error occurred while adding the order", "Error");
        }
      );
    } else {
      this.toastrService.error("Please fill in all required fields", "Warning");
    }
  }
}