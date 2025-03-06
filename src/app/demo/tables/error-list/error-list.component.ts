import { AsyncPipe, DecimalPipe, CommonModule } from '@angular/common';
import { Component, inject, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Observable } from 'rxjs';
import { errorList } from './error-list.config/error-list';
import { ErrorListService } from './error-list.config/error-list.service';

@Component({
  selector: 'app-error-list',
  imports: [FormsModule, AsyncPipe, NgbPaginationModule, CommonModule, SharedModule],
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss'],
  providers: [ErrorListService, DecimalPipe]
})
export class ErrorListComponent {
  service = inject(ErrorListService);
  private modalService = inject(NgbModal);

  errorList$!: Observable<errorList[]>;
  total$!: Observable<number>;

  constructor() {
    this.errorList$ = this.service.errorList$;
    this.total$ = this.service.total$;
  }
  copyTable() {
    const table = document.querySelector('table')!;
    const range = document.createRange();
    range.selectNode(table);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
    document.execCommand('copy');
    alert('Table copied to clipboard!');
  }

  // Print Table function
  printTable() {
    const printWindow = window.open('', '', 'height=500,width=800');
    const tableContent = document.querySelector('table')?.outerHTML;
    printWindow?.document.write('<html><head><title>Print</title></head><body>');
    printWindow?.document.write(tableContent!);
    printWindow?.document.write('</body></html>');
    printWindow?.document.close();
    printWindow?.print();
  }

  // Download CSV function
  downloadCSV() {
    const table = document.querySelector('table');
    const rows = table?.querySelectorAll('tr');
    const csvData: string[] = [];
  
    rows?.forEach((row) => {
      const rowData: string[] = [];
      row.querySelectorAll('td, th').forEach((cell) => {
        // Burada `cell` öğesinin tipini HTMLTableCellElement olarak belirtiyoruz
        const tableCell = cell as HTMLTableCellElement; 
        rowData.push(tableCell.innerText);  // innerText özelliğini kullanabiliriz
      });
      csvData.push(rowData.join(','));
    });
  
    const csvString = csvData.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'error_report.csv';
    link.click();
  }

  // Edit fonksiyonu: Modal'ini açacak
  editError(details: ElementRef, error: errorList) {
    console.log('Editing error:', error);
    this.modalService.open(details);
  }

  // Delete fonksiyonu: Modal'ini açacak
  deleteError(details: ElementRef, error: errorList) {
    console.log('Deleting error:', error);
    this.modalService.open(details);
  }
}
