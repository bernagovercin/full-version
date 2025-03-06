// Angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-horizontal',
  imports: [CommonModule, SharedModule],
  templateUrl: './theme-horizontal.component.html',
  styleUrls: ['./theme-horizontal.component.scss']
})
export class ThemeHorizontalComponent {}
