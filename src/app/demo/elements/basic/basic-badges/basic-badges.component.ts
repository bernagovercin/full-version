// Angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-basic-badges',
  imports: [CommonModule, SharedModule],
  templateUrl: './basic-badges.component.html',
  styleUrls: ['./basic-badges.component.scss']
})
export class BasicBadgesComponent {}
