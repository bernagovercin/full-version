// Angular import
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModalModule } from 'src/app/theme/shared/components';

@Component({
  selector: 'app-advance-modal',
  imports: [CommonModule, SharedModule, ModalModule],
  templateUrl: './advance-modal.component.html',
  styleUrls: ['./advance-modal.component.scss']
})
export class AdvanceModalComponent {
  // private Method
  openMyModal(event: string) {
    document.querySelector('#' + event)?.classList.add('md-show');
  }

  closeMyModal(event: {
    target: { parentElement: { parentElement: { parentElement: { classList: { remove: (arg0: string) => void } } } } };
  }) {
    event.target.parentElement.parentElement.parentElement.classList.remove('md-show');
  }
}
