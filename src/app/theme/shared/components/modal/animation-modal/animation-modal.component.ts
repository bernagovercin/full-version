// Angular import
import { Component, ViewEncapsulation, effect, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';

// project import
import { ThemeService } from '../../../service/theme.service';
import { BerryConfig } from 'src/app/app-config';

@Component({
  selector: 'app-animation-modal',
  imports: [NgClass],
  templateUrl: './animation-modal.component.html',
  styleUrls: ['./animation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnimationModalComponent {
  private themeService = inject(ThemeService);

  // public props
  modalClass = input<string>();
  contentClass = input<string>();
  modalID = input<string>();
  backDrop = input(false);
  themeMode = BerryConfig.isDarkMode;

  // constructor
  constructor() {
    effect(() => {
      this.isDarkTheme(this.themeService.isDarkTheme());
    });
  }

  // private method
  private isDarkTheme(isDark: boolean) {
    this.themeMode = isDark;
  }

  // public method
  close(event: string) {
    (document.querySelector('#' + event) as HTMLElement).classList.remove('md-show');
  }
}
