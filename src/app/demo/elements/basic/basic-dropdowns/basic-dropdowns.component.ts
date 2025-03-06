// Angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-basic-dropdowns',
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-dropdowns.component.html',
  styleUrls: ['./basic-dropdowns.component.scss']
})
export class BasicDropdownsComponent {}
