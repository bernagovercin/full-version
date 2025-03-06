// Angular import
import { Component, OnInit, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';
import { BerryConfig } from 'src/app/app-config';

@Component({
  selector: 'app-v3-fr-password',
  imports: [RouterModule, SharedModule],
  templateUrl: './v3-fr-password.component.html',
  styleUrls: ['./v3-fr-password.component.scss']
})
export class V3FrPasswordComponent implements OnInit {
  private themeService = inject(ThemeService);

  // public props
  themeMode!: boolean;

  //  constructor
  constructor() {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkTheme());
    });
  }

  // life cycle event
  ngOnInit() {
    this.themeMode = BerryConfig.isDarkMode;
  }

  // private method
  private isDarkTheme(isDark: boolean) {
    this.themeMode = isDark;
  }
}
