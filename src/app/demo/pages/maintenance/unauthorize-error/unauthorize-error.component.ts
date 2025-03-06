// Angular import
import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

// project import
import { ThemeService } from 'src/app/theme/shared/service/theme.service';

@Component({
  selector: 'app-unauthorize-error',
  imports: [RouterModule, CommonModule],
  templateUrl: './unauthorize-error.component.html',
  styleUrl: './unauthorize-error.component.scss'
})
export class UnauthorizeErrorComponent {
  private themeService = inject(ThemeService);

  isDark: boolean = false;

  //constructor
  constructor() {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkTheme());
    });
  }

  // private method
  private isDarkTheme(isDark: boolean) {
    this.isDark = isDark;
  }
}
