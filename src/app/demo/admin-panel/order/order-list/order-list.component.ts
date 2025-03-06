import { AsyncPipe, DecimalPipe, CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { OrderListService } from './order-list.config/order-list.service';
import { OrderService } from 'src/app/theme/shared/service/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  imports: [CommonModule, SharedModule, FormsModule, AsyncPipe, NgbTypeaheadModule, NgbPaginationModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [OrderListService, DecimalPipe]
})
export class OrderListComponent {
  service = inject(OrderListService);
  private modalService = inject(NgbModal);
  private orderService = inject(OrderService);
  private toastrService = inject(ToastrService);

  @ViewChild('editOrderModal') editOrderModal: any; // Edit modal template referansı
  @ViewChild('deleteOrderModal') deleteOrderModal: any; // Delete modal template referansı

  orderList$!: Observable<any[]>;
  total$!: Observable<number>;
  selectedOrder: any = null;

  constructor() {
    this.orderList$ = this.service.orderList$;
    this.total$ = this.service.total$;
  }

  // Edit fonksiyonu: Modal'ini açacak
  editOrder(order: any) {
    this.selectedOrder = { ...order }; // Seçilen siparişi kopyala
    this.modalService.open(this.editOrderModal);
  }

  // Delete fonksiyonu: Modal'ini açacak
  deleteOrder(order: any) {
    this.selectedOrder = order;
    this.modalService.open(this.deleteOrderModal);
  }

  // Siparişi güncelle
  saveChanges() {
    if (this.selectedOrder) {
      this.orderService.updateOrder(this.selectedOrder).subscribe({
        next: (response: string) => {
          this.toastrService.success('Order updated successfully', 'Success');
          this.modalService.dismissAll();
          this.service._search$.next(); // Listeyi yenile
        },
        error: (error: any) => {
          console.error('Error updating order:', error);
          this.toastrService.error('Error updating order', 'Error');
        }
      });
    }
  }

  // Siparişi sil
  confirmDelete() {
    if (this.selectedOrder) {
      this.orderService.deleteOrder(this.selectedOrder.id).subscribe({
        next: (response: string) => {
          this.toastrService.success('Order deleted successfully', 'Success');
          this.modalService.dismissAll();
          this.service._search$.next(); // Listeyi yenile
        },
        error: (error: any) => {
          console.error('Error deleting order:', error);
          this.toastrService.error('Error deleting order', 'Error');
        }
      });
    }
  }
}