// Angular import
import { Component, output } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-nav-left',
  imports: [SharedModule],
  templateUrl: './nav-left.component.html',
  styleUrl: './nav-left.component.scss'
})
export class NavLeftComponent {
  // public props
  NavCollapsedMob = output();

  // public method
  navCollapsedMob() {
    this.NavCollapsedMob.emit();
  }
}
