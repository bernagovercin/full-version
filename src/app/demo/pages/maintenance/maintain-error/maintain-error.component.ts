// Angular import
import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//project import
import { ThemeService } from 'src/app/theme/shared/service/theme.service';

@Component({
  selector: 'app-maintain-error',
  imports: [CommonModule, RouterModule],
  templateUrl: './maintain-error.component.html',
  styleUrls: ['./maintain-error.component.scss']
})
export class MaintainErrorComponent {
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
