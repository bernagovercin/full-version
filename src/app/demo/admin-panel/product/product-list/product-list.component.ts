import { AsyncPipe, DecimalPipe, CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Observable } from 'rxjs';
import { NgbPaginationModule, NgbTypeaheadModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { productListService } from './product-list.config/product-list.service';
import { ProductService } from 'src/app/theme/shared/service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, SharedModule, FormsModule, AsyncPipe, NgbTypeaheadModule, NgbPaginationModule, CommonModule, SharedModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [productListService, DecimalPipe]
})
export class ProductListComponent {
  service = inject(productListService);
  private modalService = inject(NgbModal);
  private productService = inject(ProductService);
  private toastrService = inject(ToastrService);

  @ViewChild('editProductModal') editProductModal: any; // Edit modal template referansı
  @ViewChild('deleteProductModal') deleteProductModal: any; // Delete modal template referansı

  productList$!: Observable<any[]>;
  total$!: Observable<number>;
  selectedProduct: any = null;

  constructor() {
    this.productList$ = this.service.productList$;
    this.total$ = this.service.total$;
  }

  editProduct(product: any) {
    this.selectedProduct = { ...product }; // Ürün bilgilerini kopyala
    this.modalService.open(this.editProductModal); // Edit modal'ı aç
  }

  saveChanges() {
    if (this.selectedProduct) {
      this.productService.updateProduct(this.selectedProduct).subscribe({
        next: (response) => {
          this.toastrService.success('Product updated successfully', 'Success');
          this.modalService.dismissAll();
          this.service._search$.next(); // Refresh the list
        },
        error: (error) => {
          console.error('Error updating product', error);
          this.toastrService.error('Error updating product', 'Error');
        }
      });
    }
  }

  deleteProduct(product: any) {
    this.selectedProduct = product;
    this.modalService.open(this.deleteProductModal); // Delete modal'ı aç
  }

  confirmDelete() {
    if (this.selectedProduct) {
      this.productService.deleteProduct(this.selectedProduct.id).subscribe({
        next: (response) => {
          this.toastrService.success('Product deleted successfully', 'Success');
          this.modalService.dismissAll();
          this.service._search$.next(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          this.toastrService.error('Error deleting product: ' + error.message, 'Error');
        }
      });
    }
  }
}