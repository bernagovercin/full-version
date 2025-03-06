// Angular import
import { AsyncPipe, DecimalPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// rxjs library
import { Observable } from 'rxjs';

// bootstrap import
import { NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

// project import
import { productList } from './product-list.config/product-list';
import { productListService } from './product-list.config/product-list.service';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, SharedModule, FormsModule, AsyncPipe, NgbTypeaheadModule, NgbPaginationModule, CommonModule, SharedModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [productListService, DecimalPipe]
})
export class ProductListComponent {
  service = inject(productListService);

  productList$!: Observable<productList[]>;
  total$!: Observable<number>;

  closeResult!: string;

  constructor() {
    const service = this.service;

    this.productList$ = service.productList$;
    this.total$ = service.total$;
  }
}
