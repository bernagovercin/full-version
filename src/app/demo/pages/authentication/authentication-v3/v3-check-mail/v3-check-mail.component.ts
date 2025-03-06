// Angular import
import { Component, OnInit, effect, inject } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ThemeService } from 'src/app/theme/shared/service/theme.service';
import { BerryConfig } from 'src/app/app-config';

@Component({
  selector: 'app-v3-check-mail',
  imports: [SharedModule],
  templateUrl: './v3-check-mail.component.html',
  styleUrls: ['./v3-check-mail.component.scss']
})
export class V3CheckMailComponent implements OnInit {
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
