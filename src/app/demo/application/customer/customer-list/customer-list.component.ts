// Angular import
import { AsyncPipe, DecimalPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { customer } from './customer-data.config/customer';
import { CustomerDataService } from './customer-data.config/customer-data.service';

// rxjs library
import { Observable } from 'rxjs';

// bootstrap import
import { NgbPaginationModule, NgbTooltipModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-list',
  imports: [FormsModule, AsyncPipe, NgbTypeaheadModule, NgbPaginationModule, CommonModule, NgbTooltipModule, SharedModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  providers: [CustomerDataService, DecimalPipe]
})
export class CustomerListComponent {
  service = inject(CustomerDataService);

  customer$!: Observable<customer[]>;
  total$!: Observable<number>;

  closeResult!: string;

  constructor() {
    const service = this.service;

    this.customer$ = service.customer$;
    this.total$ = service.total$;
  }
}
