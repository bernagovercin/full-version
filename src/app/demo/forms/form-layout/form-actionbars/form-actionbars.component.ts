// Angular import
import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';

@Component({
  selector: 'app-form-actionbars',
  imports: [CommonModule, SharedModule],
  templateUrl: './form-actionbars.component.html',
  styleUrls: ['./form-actionbars.component.scss']
})
export class FormActionbarsComponent {
  private themeService = inject(ThemeService);

  isDark: boolean = false;

  constructor() {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkTheme());
    });
  }

  private isDarkTheme(isDark: boolean) {
    this.isDark = isDark;
  }
}
