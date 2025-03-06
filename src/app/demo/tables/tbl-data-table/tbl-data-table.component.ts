// angular import
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { TblSearchingComponent } from './tbl-searching/tbl-searching.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-tbl-data-table',
  imports: [CommonModule, DataTablesModule, TblSearchingComponent, SharedModule],
  templateUrl: './tbl-data-table.component.html',
  styleUrl: './tbl-data-table.component.scss'
})
export class TblDataTableComponent implements OnInit {
  // public props
  dtExportButtonOptions: object = {};
  dtColumnsReorderOptions: object = {};
  dtResponsiveOptions: object = {};
  dtRowSelectOptions: object = {};
  dtRouterLinkOptions: object = {};

  // Life cycle events
  ngOnInit() {
    this.dtExportButtonOptions = {
      ajax: 'fake-data/datatable-data.json',
      columns: [
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Position',
          data: 'position'
        },
        {
          title: 'Office',
          data: 'office'
        },
        {
          title: 'Age',
          data: 'age'
        },
        {
          title: 'Start Date',
          data: 'date'
        },
        {
          title: 'Salary',
          data: 'salary'
        }
      ],
      dom: 'Bfrtip',
      buttons: ['copy', 'print', 'excel', 'csv']
    };
    this.dtColumnsReorderOptions = {
      ajax: 'fake-data/datatable-data.json',
      columns: [
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Position',
          data: 'position'
        },
        {
          title: 'Office',
          data: 'office'
        },
        {
          title: 'Age',
          data: 'age'
        },
        {
          title: 'Start Date',
          data: 'date'
        },
        {
          title: 'Salary',
          data: 'salary'
        }
      ],
      dom: 'Rt',
      colReorder: {
        order: [0, 3, 4, 2, 1, 5],
        fixedColumnsRight: 1
      },
      responsive: true
    };
    this.dtResponsiveOptions = {
      ajax: 'fake-data/datatable-data.json',
      columns: [
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Position',
          data: 'position'
        },
        {
          title: 'Office',
          data: 'office'
        },
        {
          title: 'Age',
          data: 'age'
        },
        {
          title: 'Start Date',
          data: 'date'
        },
        {
          title: 'Salary',
          data: 'salary'
        }
      ],
      responsive: true
    };
    this.dtRowSelectOptions = {
      ajax: 'fake-data/datatable-data.json',
      columns: [
        {
          title: 'Name',
          data: 'name'
        },
        {
          title: 'Position',
          data: 'position'
        },
        {
          title: 'Office',
          data: 'office'
        },
        {
          title: 'Age',
          data: 'age'
        },
        {
          title: 'Start Date',
          data: 'date'
        },
        {
          title: 'Salary',
          data: 'salary'
        }
      ],
      responsive: true,
      select: true
    };
  }
}
