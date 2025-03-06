// Angular import
import { Component, OnInit, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BerryConfig } from 'src/app/app-config';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';

@Component({
  selector: 'app-v3-register',
  imports: [RouterModule, SharedModule],
  templateUrl: './v3-register.component.html',
  styleUrls: ['./v3-register.component.scss']
})
export class V3RegisterComponent implements OnInit {
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
