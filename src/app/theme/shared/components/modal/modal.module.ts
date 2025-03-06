// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [CommonModule, SharedModule, UiModalComponent, AnimationModalComponent],
  exports: [UiModalComponent, AnimationModalComponent]
})
export class ModalModule {}
