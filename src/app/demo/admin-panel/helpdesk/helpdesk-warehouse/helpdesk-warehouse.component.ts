import { Component, ElementRef, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { warehouse } from './helpdesk-warehouse-type';
import { helpDeskWarehouseService } from './helpdesk-warehouse.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-helpdesk-warehouse',
  imports: [SharedModule],
  templateUrl: './helpdesk-warehouse.component.html',
  styleUrls: ['./helpdesk-warehouse.component.scss'],
  providers: [helpDeskWarehouseService, DecimalPipe]
})
export class HelpdeskWarehouseComponent {
  service = inject(helpDeskWarehouseService);
  private modalService = inject(NgbModal);

  // public props
  warehouses$: Observable<warehouse[]>;
  total$: Observable<number>;

  constructor() {
    this.warehouses$ = this.service.warehouses$;
    this.total$ = this.service.total$;
  }

  // Yeni depo eklemek için kullanılacak modal
  addWarehouse(details: ElementRef) {
    this.modalService.open(details);
  }

  // Güncelleme için modal açma
  updateWarehouse(details: ElementRef, warehouse: warehouse) {
    console.log('Güncelleniyor:', warehouse);
    this.modalService.open(details);
  }

  // Silme işlemi için modal açma
  deleteWarehouse(details: ElementRef, warehouse: warehouse) {
    console.log('Silme işlemi başlatıldı:', warehouse);
    this.modalService.open(details); // Silme için modal açıyoruz
  }

  // Silme işlemi
  performDelete(warehouse: warehouse) {
    console.log('Depo Silindi:', warehouse);
    // Burada, silme işlemi için API çağrısı yapılabilir
  }
}
